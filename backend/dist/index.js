"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_secret = 'secret';
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    credentials: true,
    origin: 'http://localhost:5173/',
}));
app.post('/signin', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const token = jsonwebtoken_1.default.sign({
        id: 1
    }, jwt_secret);
    res.cookie('token', token);
    console.log('cookie token', token);
    res.send('Successfully logged in!!!');
});
app.get('/user', (req, res) => {
    const token = req.cookies.token;
    const decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
    res.send({
        userId: decoded.id
    });
});
app.post('/logout', (req, res) => {
    res.cookie('token', '');
    res.json({
        message: "successfully logged out!!!"
    });
});
app.listen(3000, () => {
    console.log(`server is up !!!`);
});
