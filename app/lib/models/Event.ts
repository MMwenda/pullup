import {Schema , model, models } from "mongoose";

const EventSchema = new Schema({
    title: {type: String, required: true },
    description: {type: String, required: true },
    latitude: {type: Number, required: true },
    longitude: {type: Number, required: true },
    time: {type: Date, required: true },
    createdAt: {type: Date, default: Date.now },
})

const Event = models.Event || model("Event", EventSchema);
//models.Event checks whether the Event model has already been registered in Mongoose internal cache.
// || OR, if it already exists, it uses that existing model
//if it doesnt exits the first time the code runs, it compiles and registers a new model using the schema

export default Event;