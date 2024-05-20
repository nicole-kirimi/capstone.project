import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

const dbFilePath = './db.json';

app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const users = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));

    if (users.find(user => user.username === username)) {
        res.json({ success: false, message: 'Username already exists' });
    } else {
        users.push({ username, password });
        fs.writeFileSync(dbFilePath, JSON.stringify(users, null, 2));
        res.json({ success: true });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
