import { verify } from "jsonwebtoken";

function token (req, res, next) {
    if (req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.token.split(' ')[1];
        if (!token) {
            return res.status(403).send({"Error": "User not authorized"}).status(403);
        }
        verify(token, "21HmacSHA143");
        next();
    } catch (e) {
        console.log(e)
        return res.json({"msg": "User not authorized"}).status(403);
    }
}

export default token;