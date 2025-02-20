const  socket  = io('http://localhost:3030'); 

const videoGrid = document.getElementById('video-grid');
console.log(videoGrid);
const myVideo = document.createElement('video');
    myVideo.muted = true;

var peer = new Peer(undefined,{
    host: 'localhost',
    port: '3030',
    path: '/peerjs'
});

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    video:true,
    audio:true
}).then(stream=>{
    myVideoStream = stream;
    addVideoStream(myVideo, stream);


   peer.on('call', call =>{
    call.answer(stream);
    const video = document.createElement('video');
    call.on('stream', userVideoStream=>{
        addVideoStream(video, userVideoStream);
     })
   })


    socket.on('user-connected', (userId) =>{
        connectToNewUser(userId, stream);
    })
})


peer.on('open', id =>{
    console.log('Peer ID:', id);
    socket.emit('join-room', ROOM_ID, id);
})




const connectToNewUser = (userId, stream) => {
    const call = peer.call(userId, stream);
    const video = document.createElement('video');
    call.on('stream', (userVideoStream) => {
        addVideoStream(video, userVideoStream);
    });
}



const addVideoStream = (video, stream) =>{
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

let text = $('input');
console.log(text);


$('html').keydown((e) =>{
    if(e.which == && Text.val().length!==0){
        console.log(text.val());
        socket.emit('messege', text.val());
        text.val();
    }
});