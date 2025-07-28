const socket = io('http://localhost:3030'); 

// Pre-meeting elements
const preMeeting = document.getElementById('pre-meeting');
const videoCall = document.getElementById('video-call');
const invitationLink = document.getElementById('invitationLink');
const copyLinkBtn = document.getElementById('copyLink');
const meetingIdSpan = document.getElementById('meetingId');
const participantCountSpan = document.getElementById('participantCount');
const startMeetingBtn = document.getElementById('startMeeting');
const leaveMeetingBtn = document.getElementById('leaveMeeting');

// Video call elements
const videoGrid = document.getElementById('video-grid');
console.log(videoGrid);
const myVideo = document.createElement('video');
myVideo.muted = true;

var peer = new Peer(undefined, {
    host: 'localhost',
    port: '3030',
    path: '/peerjs'
});

let myVideoStream;
let isMuted = false;
let isVideoStopped = false;
let meetingStarted = false;

// Initialize pre-meeting screen
function initializePreMeeting() {
    const currentUrl = window.location.href;
    invitationLink.value = currentUrl;
    meetingIdSpan.textContent = ROOM_ID;
    
    // Copy link functionality
    copyLinkBtn.addEventListener('click', () => {
        invitationLink.select();
        invitationLink.setSelectionRange(0, 99999); // For mobile devices
        document.execCommand('copy');
        
        // Visual feedback
        const originalText = copyLinkBtn.innerHTML;
        copyLinkBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        copyLinkBtn.style.backgroundColor = '#28a745';
        
        setTimeout(() => {
            copyLinkBtn.innerHTML = originalText;
            copyLinkBtn.style.backgroundColor = '#007bff';
        }, 2000);
    });
    
    // Start meeting functionality
    startMeetingBtn.addEventListener('click', () => {
        startMeeting();
    });
    
    // Leave meeting functionality
    leaveMeetingBtn.addEventListener('click', () => {
        window.location.href = '/';
    });
}

// Start the meeting
function startMeeting() {
    preMeeting.style.display = 'none';
    videoCall.style.display = 'flex';
    meetingStarted = true;
    
    // Initialize video call functionality
    initializeVideoCall();
}

// Initialize video call functionality
function initializeVideoCall() {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
    }).then(stream => {
        myVideoStream = stream;
        addVideoStream(myVideo, stream);

        peer.on('call', call => {
            call.answer(stream);
            const video = document.createElement('video');
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream);
            })
        })

        socket.on('user-connected', (userId) => {
            connectToNewUser(userId, stream);
            updateParticipantCount();
        })
    })
}

peer.on('open', id => {
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

const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    })
    videoGrid.append(video);
}

// Update participant count
function updateParticipantCount() {
    const currentCount = document.querySelectorAll('#video-grid video').length;
    participantCountSpan.textContent = currentCount;
}

// Mute functionality
const muteButton = document.getElementById('muteButton');
muteButton.addEventListener('click', () => {
    if (!myVideoStream) return;
    
    const audioTrack = myVideoStream.getAudioTracks()[0];
    if (audioTrack) {
        if (isMuted) {
            audioTrack.enabled = true;
            muteButton.querySelector('i').className = 'fas fa-microphone';
            muteButton.querySelector('span').textContent = 'Mute';
            isMuted = false;
        } else {
            audioTrack.enabled = false;
            muteButton.querySelector('i').className = 'fas fa-microphone-slash';
            muteButton.querySelector('span').textContent = 'Unmute';
            isMuted = true;
        }
    }
});

// Stop video functionality
const stopVideoButton = document.getElementById('stopVideoButton');
stopVideoButton.addEventListener('click', () => {
    if (!myVideoStream) return;
    
    const videoTrack = myVideoStream.getVideoTracks()[0];
    if (videoTrack) {
        if (isVideoStopped) {
            videoTrack.enabled = true;
            stopVideoButton.querySelector('i').className = 'fas fa-video';
            stopVideoButton.querySelector('span').textContent = 'Stop Video';
            isVideoStopped = false;
        } else {
            videoTrack.enabled = false;
            stopVideoButton.querySelector('i').className = 'fas fa-video-slash';
            stopVideoButton.querySelector('span').textContent = 'Start Video';
            isVideoStopped = true;
        }
    }
});

// Chat functionality
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');
const chatBox = document.querySelector('.chat-box');

function addMessage(message, isOwn = false) {
    const messageDiv = document.createElement('div');
    messageDiv.style.margin = '10px 0';
    messageDiv.style.padding = '10px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.maxWidth = '80%';
    messageDiv.style.wordWrap = 'break-word';
    
    if (isOwn) {
        messageDiv.style.backgroundColor = '#007bff';
        messageDiv.style.color = 'white';
        messageDiv.style.marginLeft = 'auto';
    } else {
        messageDiv.style.backgroundColor = '#444';
        messageDiv.style.color = 'white';
    }
    
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('message', message);
        addMessage(message, true);
        messageInput.value = '';
    }
}

sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Listen for incoming messages
socket.on('message', (message) => {
    addMessage(message, false);
});

// Listen for participant count updates
socket.on('participant-count', (count) => {
    participantCountSpan.textContent = count;
});

// Leave meeting functionality
document.querySelector('.leave-meeting').addEventListener('click', () => {
    window.location.href = '/';
});

// Initialize the pre-meeting screen
initializePreMeeting();