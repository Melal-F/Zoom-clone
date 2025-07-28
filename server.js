const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { v4: uuidv4 } = require('uuid');
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug: true
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/peerjs', peerServer);

app.get('/', (req, res) => {
    res.redirect(`/${uuidv4()}`);
})

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room });
})

// Track participants in each room
const roomParticipants = new Map();

io.on('connection', socket => {
    socket.on('join-room', (roomId, userId) => {
        socket.join(roomId);
        console.log(`Server received userId: ${userId} for room: ${roomId}`);
        
        // Track participants
        if (!roomParticipants.has(roomId)) {
            roomParticipants.set(roomId, new Set());
        }
        roomParticipants.get(roomId).add(userId);
        
        // Broadcast user connected
        socket.broadcast.to(roomId).emit('user-connected', userId);
        
        // Send participant count to all users in the room
        const participantCount = roomParticipants.get(roomId).size;
        io.to(roomId).emit('participant-count', participantCount);
    })

    socket.on('message', (message) => {
        socket.broadcast.to(Array.from(socket.rooms)[1]).emit('message', message);
    })
    
    socket.on('disconnect', () => {
        // Remove user from room tracking when they disconnect
        for (const [roomId, participants] of roomParticipants.entries()) {
            if (participants.has(socket.id)) {
                participants.delete(socket.id);
                const participantCount = participants.size;
                io.to(roomId).emit('participant-count', participantCount);
                break;
            }
        }
    })
})

server.listen(3030);