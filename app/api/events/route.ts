import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/lib/models/Event";
import { NextResponse } from "next/server"; //Next.js's way of sending responses back from an API route

export async function GET() {
    // When someone makes a GET request to /api/events, Next.js automatically runs this function. The name GET is what triggers it
    await connectDB();
    const events = await Event.find().sort({createdAt: -1});
    //get all documents in the events collection.
    //sortt them from newest first (-1) (1, is opposite)

    return NextResponse.json(events);
    //Send the events back as JSON to whoever made the request. This is what your frontend or Postman will receive
}

export async function POST(req: Request) {
    //req is the incoming request, it contains the data the user sent.
    await connectDB();
    const body = await req.json();

    const event = await Event.create({
    title: body.title,
    description: body.description,
    latitude: body.latitude,
    longitude: body.longitude,
    time: new Date(body.time),
  });
  //Create a new document in MongoDB using the data from the request body.
  //new Date(body.time) converts the time string like "2026-03-25T17:00:00.000Z" into an actual JavaScript Date object — because that's what your schema expects.

  return NextResponse.json(event);

}

