import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;
//cache the connection

if(!MONGODB_URI) {
    throw new Error("Please define MONGODB_URI in .env");
}

// eslint-disable-next-line prefer-const , @typescript-eslint/no-explicit-any
let cached = (global as any).mongoose || {conn: null, promise: null};//the starting state, no connection, no pending connection
//this is a key line
//keyword global is an object that persist across all rewuests in the app: we do this so that connection survives between requests.

export async function connectDB() {
    if(cached.conn) return cached.conn; //if connection is true, run it immediately

    if(!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((m: typeof mongoose) => m); 
        //stores the promise
        //The promise is stored so if two requests come in at the same time, the second one waits for the first connection instead of starting its own.
        //.then passes the result unchanged when promise resolves
        
    }

    cached.conn = await cached.promise;
    return cached.conn;
} 