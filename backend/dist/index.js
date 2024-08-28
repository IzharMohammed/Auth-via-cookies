"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const path_1 = __importDefault(require("path"));
// Secret key for JWT signing
const jwt_secret = 'secret';
const app = (0, express_1.default)();
// Middleware to parse cookies
app.use((0, cookie_parser_1.default)());
// Middleware to parse JSON request bodies
app.use(express_1.default.json());
// Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use((0, cors_1.default)({
    credentials: true, // Allow credentials (cookies, authorization headers) to be sent
    origin: 'http://localhost:5173', // Allow requests from this origin
}));
// Route to handle user sign-in
app.post('/signin', (req, res) => {
    const email = req.body.email; // Get email from request body
    const password = req.body.password; // Get password from request body
    // Create a JWT token with user ID (in this case, hardcoded as 1)
    const token = jsonwebtoken_1.default.sign({
        id: 1
    }, jwt_secret);
    // Set the token in a cookie
    res.cookie('token', token);
    console.log('cookie token', token);
    // Respond to the client
    res.send('Successfully logged in!!!');
});
// Route to retrieve user information based on JWT token
app.get('/user', (req, res) => {
    const token = req.cookies.token; // Get the token from cookies
    // Verify and decode the JWT token
    const decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
    // Send the user ID back in the response
    res.send({
        userId: decoded.id
    });
});
// Route to handle user logout
app.post('/logout', (req, res) => {
    // Clear the JWT token cookie
    // res.clearCookie('token');  // Alternative method to clear cookie
    res.cookie('token', ''); // Set the token cookie to an empty string
    // Respond to the client
    res.json({
        message: "successfully logged out!!!"
    });
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../src/index.html"));
});
// Start the server on port 3000
app.listen(3000, () => {
    console.log(`server is up !!!`);
});
