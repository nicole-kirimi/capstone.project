import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';


const http = require('http');
const url = require('url');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = [];

const JWT_SECRET = 'your_jwt_secret';

