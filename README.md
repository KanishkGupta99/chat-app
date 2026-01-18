# Chat App

A modern, real-time chat application built with React and Node.js, featuring instant messaging, user authentication, and seamless image sharing capabilities.

## What is this project?

Chat App is a full-stack web application that enables users to communicate in real-time through text messages and image sharing. It provides a clean, intuitive interface for managing conversations, user profiles, and online presence indicators.

## Why is this project useful?

This project demonstrates:

- **Real-time Communication**: Instant messaging powered by Socket.IO
- **Secure Authentication**: JWT-based authentication with password hashing
- **Rich Media Support**: Share images seamlessly in conversations
- **User Presence**: Real-time online/offline status indicators
- **Modern UI/UX**: Responsive design with Tailwind CSS
- **Scalable Architecture**: RESTful API backend with MongoDB

### Key Features

#### Frontend Features
- 🔐 **User Authentication**: Secure signup and login with form validation
- 💬 **Real-time Chat**: Instant message delivery and reception
- 🖼️ **Image Sharing**: Send and receive images in conversations
- 👥 **User Management**: Search and browse all users in the system
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ✅ **Read Receipts**: Unread message badges and seen status
- 🌐 **Online Status**: Live online/offline indicators for all users
- 📸 **Media Gallery**: View all shared images in a dedicated sidebar
- 👤 **Profile Management**: Edit profile picture, name, and bio
- 🎨 **Modern UI**: Beautiful gradient design with backdrop blur effects

#### Backend Features
- 🔒 **JWT Authentication**: Secure token-based authentication system
- 🗄️ **MongoDB Integration**: Scalable NoSQL database with Mongoose ODM
- ☁️ **Cloudinary Integration**: Cloud-based image storage for profile pictures and messages
- 🔐 **Password Security**: Bcrypt password hashing for secure credential storage
- 🚀 **RESTful API**: Well-structured API endpoints for all operations
- 🔌 **Socket.IO Server**: Real-time bidirectional communication
- 🛡️ **Protected Routes**: Middleware-based route protection
- ✅ **Message Status Tracking**: Read/unread message status management
- 👥 **User Presence**: Real-time online user tracking via WebSockets

## How users can get started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- MongoDB database (local or MongoDB Atlas)
- Cloudinary account (for image storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chat-app
   ```

2. **Backend Setup**

   Navigate to the backend directory:
   ```bash
   cd backend
   ```

   Install dependencies:
   ```bash
   npm install
   ```

   Create a `.env` file in the `backend` directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

   Start the backend server:
   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`

3. **Frontend Setup**

   Navigate to the frontend directory (in a new terminal):
   ```bash
   cd frontend
   ```

   Install dependencies:
   ```bash
   npm install
   ```

   Create a `.env` file in the `frontend` directory:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```

   Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:5173` (or the port shown in the terminal)

### Usage Examples

1. **Creating an Account**
   - Navigate to the login page
   - Click "Create an account" or switch to "Sign Up"
   - Fill in your full name, email, and password
   - Complete your profile bio
   - Your account will be created and you'll be automatically logged in

2. **Sending Messages**
   - Select a user from the sidebar to start a conversation
   - Type your message in the input field and press Enter or click Send
   - Messages are delivered instantly via WebSocket

3. **Sharing Images**
   - Click the gallery icon in the chat input area
   - Select an image file (JPG, PNG, or JPEG)
   - The image will be uploaded and sent automatically

4. **Updating Profile**
   - Click the menu icon in the sidebar
   - Select "Edit profile"
   - Update your name, bio, or profile picture
   - Changes are saved to your account

## Project Structure

```
chat-app/
├── backend/
│   ├── controllers/     # Request handlers
│   │   ├── messageController.js
│   │   └── userController.js
│   ├── lib/            # Utility libraries
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── utils.js
│   ├── middleware/     # Custom middleware
│   │   └── auth.js
│   ├── models/         # Database models
│   │   ├── Message.js
│   │   └── User.js
│   ├── routes/         # API routes
│   │   ├── messageRoutes.js
│   │   └── userRoutes.js
│   └── server.js       # Entry point
│
└── frontend/
    ├── context/        # React context providers
    │   ├── AuthContext.jsx
    │   └── ChatContext.jsx
    ├── components/     # Reusable components
    │   ├── ChatContainer.jsx
    │   ├── RightSideBar.jsx
    │   └── SideBar.jsx
    ├── pages/          # Page components
    │   ├── HomePage.jsx
    │   ├── LoginPage.jsx
    │   └── ProfilePage.jsx
    └── src/
        ├── App.jsx     # Main app component
        └── main.jsx    # Entry point
```

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Create a new user account
- `POST /api/auth/login` - Login with email and password
- `GET /api/auth/check` - Verify authentication status
- `PUT /api/auth/update-profile` - Update user profile

### Messages
- `GET /api/messages/users` - Get all users for sidebar
- `GET /api/messages/:id` - Get messages with a specific user
- `POST /api/messages/send/:id` - Send a message to a user
- `PUT /api/messages/mark/:id` - Mark a message as seen

### Status
- `GET /api/status` - Check server status

## Technologies Used

### Frontend
- **React 19** - UI library
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Socket.IO Client** - Real-time communication
- **Axios** - HTTP client
- **React Hot Toast** - Toast notifications
- **Vite** - Build tool and dev server

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time bidirectional communication
- **JWT** - JSON Web Tokens for authentication
- **Bcryptjs** - Password hashing
- **Cloudinary** - Cloud image management
- **CORS** - Cross-origin resource sharing

## Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-secret-key-here
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
PORT=5000
NODE_ENV=development
```

### Frontend (.env)
```env
VITE_BACKEND_URL=http://localhost:5000
```

## Scripts

### Backend
- `npm start` - Start the development server with nodemon

### Frontend
- `npm run dev` - Start the Vite development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Where users can get help

- **Issues**: Report bugs or request features by opening an issue on GitHub
- **Documentation**: Check the code comments and inline documentation
- **Questions**: Contact the maintainer or community for support

## Who maintains and contributes

This project is maintained by the development team. Contributions are welcome!

### Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## License

This project is licensed under the ISC License - see the LICENSE file for details.
