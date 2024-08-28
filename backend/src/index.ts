import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken'

// Secret key for JWT signing
const jwt_secret = 'secret';

const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to handle Cross-Origin Resource Sharing (CORS)
app.use(cors({
    credentials: true,  // Allow credentials (cookies, authorization headers) to be sent
    origin: 'http://localhost:5173/',  // Allow requests from this origin
}))

// Route to handle user sign-in
app.post('/signin', (req, res) => {
    const email = req.body.email;  // Get email from request body
    const password = req.body.password;  // Get password from request body

    // Create a JWT token with user ID (in this case, hardcoded as 1)
    const token = jwt.sign({
        id: 1
    }, jwt_secret)

    // Set the token in a cookie
    res.cookie('token', token);
    console.log('cookie token',token);
    
    // Respond to the client
    res.send('Successfully logged in!!!');
});

// Route to retrieve user information based on JWT token
app.get('/user', (req, res) => {
    const token = req.cookies.token;  // Get the token from cookies

    // Verify and decode the JWT token
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;

    // Send the user ID back in the response
    res.send({
        userId: decoded.id
    })
})

// Route to handle user logout
app.post('/logout', (req, res) => {

    // Clear the JWT token cookie
    // res.clearCookie('token');  // Alternative method to clear cookie
    
    res.cookie('token', '');  // Set the token cookie to an empty string

    // Respond to the client
    res.json({
        message: "successfully logged out!!!"
    })
})

// Start the server on port 3000
app.listen(3000,()=>{
    console.log(`server is up !!!`);
})
