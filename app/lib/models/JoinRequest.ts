import { Schema, model, models } from "mongoose";

const JoinRequestSchema = new Schema({
    userId: { type: String, required: true },
    eventId: { type: String, required: true },
    message: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
});

const JoinRequest = models.JoinRequest || model("JoinRequest", JoinRequestSchema);
export default JoinRequest;
