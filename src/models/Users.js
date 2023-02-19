import { model, Schema } from "mongoose"

const Users = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    favorites: { type: Array, required: true, default: [] },
    comics_favorites: { type: Array, required: true, default: [] }
});

export default model("Users", Users);