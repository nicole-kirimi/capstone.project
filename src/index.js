import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


const http = require('http');
const url = require('url');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];

const JWT_SECRET = 'your_jwt_secret';

function generateToken(user) {
    return jwt.sign({ username: user.username }, JWT_SECRET);
}

// Function to verify JWT token
function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

const server = http.createServer((req, res) => {
    const { pathname, query } = url.parse(req.url, true);

    // Signup endpoint
    if (pathname === '/signup' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { username, password, email } = JSON.parse(body);
            const hashedPassword = await bcrypt.hash(password, 10);
            users.push({ username, password: hashedPassword, email });
            res.writeHead(201, { 'Content-Type': 'text/plain' });
            res.end('User created');
        });
    }

    // Login endpoint
    else if (pathname === '/login' && req.method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const { username, password } = JSON.parse(body);
            const user = users.find(user => user.username === username);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                res.writeHead(401, { 'Content-Type': 'text/plain' });
                res.end('Invalid credentials');
            } else {
                const token = generateToken(user);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ token }));
            }
        });
    }

    // Protected endpoint example
    else if (pathname === '/profile' && req.method === 'GET') {
        const token = req.headers.authorization?.split(' ')[1];
        const decoded = token ? verifyToken(token) : null;
        if (decoded) {
            const user = users.find(user => user.username === decoded.username);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(user));
        } else {
            res.writeHead(401, { 'Content-Type': 'text/plain' });
            res.end('Unauthorized');
        }
    }

    // Default route
    else {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Welcome to the Bakery API');
    }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});