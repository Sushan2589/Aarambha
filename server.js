const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// Ensure that your MongoDB URI is defined
const mongoURI = process.env.MONGODB_URI; // Check if this environment variable is set

if (!mongoURI) {
    console.error("MongoDB URI is not defined. Please set the MONGODB_URI environment variable.");
    process.exit(1); // Exit the application if the URI is not set
}

mongoose.connect(mongoURI)
    .then(() => console.log("MongoDB connected successfully"))
    .catch(err => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: true,
        unique: true // Ensure usernames are unique
    },
    email: { 
        type: String,
        required: true,
        unique: true // Ensure emails are unique
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

// Register endpoint
app.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }
        
        console.log('Received registration request:', { username, email });
        
        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        
        // Store the password as plain text for testing
        const user = new User({ username, email, password }); // No hashing
        const savedUser = await user.save();
        
        if (!savedUser) {
            throw new Error('Failed to save user');
        }
        
        console.log('User saved successfully:', savedUser._id);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Error registering user: ' + error.message });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;

        if (!usernameOrEmail || !password) {
            return res.status(400).json({ message: 'Username or email and password are required' });
        }

        console.log('Received login request:', { usernameOrEmail });

        // Check if user exists by username or email
        const user = await User.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        console.log('User logged in successfully:', user._id);
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Error logging in user: ' + error.message });
    }
});

// Check if port 3000 is in use before starting server
const http = require('http');
const server = http.createServer(app);

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error('Port 3000 is already in use. Please try a different port or close the application using port 3000.');
        process.exit(1);
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
