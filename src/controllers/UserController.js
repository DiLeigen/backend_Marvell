import Users from "../models/Users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config()

const token = (_id, email) => {
    const payload = {
        "_id": _id,
        "email": email
    }
    return jwt.sign(payload, process.env.JWTOKEN, { expiresIn: "24h" });
};

class UserController {
    async registration(req, res) {
        try {
            const { name, email, password, double_password } = req.body;
            if (password !== double_password) {
                return res.json({"Error": "Password mismatch!"});
            }
            if (await Users.findOne({ email: email })) {
                return res.json({"Error": "Email already registered!"})
            }
            await Users.create({ name: name, email: email, password: bcrypt.hashSync(password, 5) });
            const _id =  (await Users.findOne({ email }))._id;
            return res.json({"Request": "Success", "token": token(_id, email)}).status(200)
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong!"}).status(403);
        }
    };

    async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!await Users.findOne({ email })) {
                return res.json({"Error": "Invalid password or email"}).status(400);
            }

            const validPassword = (await Users.findOne({ email })).password;

            if (!bcrypt.compareSync(password, validPassword)) {
                return res.json({"Error": "Invalid password or email"});
            }

            const _id = (await Users.findOne({ email }))._id

            return res.json({"Request": "Success", "token": token(_id, email)}).status(200);
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong!"}).status(403);
        }
    };

    async get_favorites(req, res) {
        try {
            const { _id } = jwt.verify(req.headers.token.split(' ')[1], "21HmacSHA143");
            const user = (await Users.find({ _id }));
            return res.json(user[0].favorites);
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong"}).status(403);
        }
    }

    async delete_favorites_comics(req, res) {
        try {
            const { _id } = jwt.verify(req.headers.token.split(' ')[1], "21HmacSHA143");
            await Users.findByIdAndUpdate({ _id }, { $pull: { comics_favorites: req.params.id }})
            return res.json({"Request": "Success"}).status(200);
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong"}).status(403);
        }
    }

    async get_favorites_comics(req, res) {
        try {
            const { _id } = jwt.verify(req.headers.token.split(' ')[1], "21HmacSHA143");
            const user = (await Users.find({ _id }));
            return res.json(user[0].comics_favorites);
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong"}).status(403);
        }
    }

    async add_favorites_comics(req, res) {
        try {
            const { _id } = jwt.verify(req.headers.token.split(' ')[1], "21HmacSHA143");
            const user = (await Users.find({ _id }));
            const element = user[0].comics_favorites.find(element => element === req.params.id);
            if (element) {
                return res.status(400).send({"Error": "Comics in favorites!"})
            }
            await Users.findByIdAndUpdate({ _id }, { $push: { comics_favorites: req.params.id }});
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong"}).status(403);
        }
    }

    async add_favorites(req, res) {
        try {
            const { _id } = jwt.verify(req.headers.token.split(' ')[1], "21HmacSHA143");
            const user = (await Users.find({ _id }));
            const element = user[0].favorites.find(element => element === req.params.id);
            if (element) {
                return res.status(400).send({"Error": "Comics in favorites!"})
            }
            await Users.findByIdAndUpdate({ _id }, { $push: { favorites: req.params.id }});
            return res.json({"Request": "Success"}).status(200);
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong"}).status(403);
        }
    };

    async delete_favorites(req, res) {
        try {
            const { _id } = jwt.verify(req.headers.token.split(' ')[1], "21HmacSHA143");
            await Users.findByIdAndUpdate({ _id }, { $pull: { favorites: req.params.id }})
            return res.json({"Request": "Success"}).status(200);
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong"}).status(403);
        }
    };

    async delete_all_from_favorites(req, res)  {
        try {
            const { _id } = jwt.verify(req.headers.token.split(' ')[1], "21HmacSHA143");
            await Users.findByIdAndUpdate({ _id }, { $set: { favorites: [] }});
            return res.json({"Request": "Success"}).status(200);
        } catch (e) {
            console.error(e);
            return res.json({"Error": "Something went wrong"}).status(403);
        }
    };
}

export default new UserController();