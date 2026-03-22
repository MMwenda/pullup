import mongoose, {Schema, model, models } from "mongoose";

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true}, //no two accounts can share the same email
    password: {type: String}, //not required coz Google sign in users wont have one
    image: {type: String},
    createdAt: {type: Date, default: Date.now},
})

const User = models.User || model("User", UserSchema);
//if models.User is undefined (model doesn't exist yet), call model("User", UserSchema) to create and register a new model
//the function takes the model name as a string and the schema that defines its structure 

export default User;