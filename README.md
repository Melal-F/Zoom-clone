# MeetConnect - Modern Video Conferencing Platform

A feature-rich video conferencing application built with modern web technologies, providing seamless real-time communication with high-quality video and audio streaming.

## 🚀 Features

### Core Functionality
- **High-Quality Video/Audio Streaming** - Crystal clear video and audio using WebRTC
- **Real-Time Chat** - Instant messaging during video calls
- **Screen Sharing** - Share your screen with participants
- **Meeting Rooms** - Unique room generation with secure access
- **Participant Management** - Track and display participant count

### User Experience
- **Pre-Meeting Screen** - Generate and share invitation links before starting
- **One-Click Copy** - Easy invitation link sharing with visual feedback
- **Mute/Unmute** - Toggle microphone with visual indicators
- **Video On/Off** - Control camera with status indicators
- **Responsive Design** - Works seamlessly on desktop and mobile devices

### Security & Reliability
- **Secure Connections** - WebRTC peer-to-peer connections
- **Room Privacy** - Unique room IDs for secure meetings
- **Real-Time Updates** - Live participant count and status

## 🛠️ Technology Stack

- **Backend**: Node.js, Express.js
- **Real-Time Communication**: Socket.io
- **WebRTC**: PeerJS for peer-to-peer connections
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Template Engine**: EJS
- **Styling**: Custom CSS with responsive design

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd meet-connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   ```

4. **Access the application**
   - Open your browser and navigate to `http://localhost:3030`
   - You'll be automatically redirected to a unique meeting room

## 🎯 How to Use

### Starting a Meeting
1. Visit `http://localhost:3030`
2. You'll be redirected to a unique meeting room
3. On the pre-meeting screen, copy the invitation link
4. Share the link with others via email, messaging, etc.
5. Click "Start Meeting" to begin the video call

### Joining a Meeting
1. Click on a shared invitation link
2. Allow camera and microphone permissions
3. You'll automatically join the meeting room
4. Start communicating with other participants

### During the Meeting
- **Mute/Unmute**: Click the microphone button to toggle audio
- **Video On/Off**: Click the video button to toggle camera
- **Chat**: Use the chat panel to send text messages
- **Leave**: Click the leave button to exit the meeting

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 3030)
- `NODE_ENV`: Environment mode (development/production)

### Customization
- Modify `public/style.css` for custom styling
- Update `views/room.ejs` for UI changes
- Configure WebRTC settings in `public/script.js`

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- Built with [Socket.io](https://socket.io/) for real-time communication
- Powered by [PeerJS](https://peerjs.com/) for WebRTC connections
- Styled with modern CSS and Font Awesome icons

---

**MeetConnect** - Connecting people through seamless video communication.

