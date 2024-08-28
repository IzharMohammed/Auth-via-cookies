import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import jwt, { JwtPayload } from 'jsonwebtoken'
const jwt_secret = 'secret';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173/',
}))

app.post('/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const token = jwt.sign({
        id: 1
    }, jwt_secret)
    res.cookie('token', token);
    console.log('cookie token',token);
    
    res.send('Successfully logged in!!!');
});

app.get('/user', (req, res) => {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload;

    res.send({
        userId: decoded.id
    })
})

app.post('/logout', (req, res) => {
    res.cookie('token', '');
    res.json({
        message: "successfully logged out!!!"
    })
})

app.listen(3000,()=>{
    console.log(`server is up !!!`);
})