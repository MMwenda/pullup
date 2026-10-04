import {auth} from "@/app/lib/auth";
import { connectDB } from "@/app/lib/mongoose";
import Event from "@/app/lib/models/Event";
import JoinRequest from "@/app/lib/models/JoinRequest";
import { NextResponse } from "next/server"; //sending responses back from an API route

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get("eventId");

    if(!eventId) {
        return NextResponse.json({error: "Missing eventId"}, {status: 400});
    }

    await connectDB();
    const session = await auth();
    if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // fetch the event
    const event = await Event.findById(eventId);

    // check if the requester is the host
    if (event.userId !== session.user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const joinRequests = await JoinRequest.find({ eventId }).sort({createdAt: -1});

    return NextResponse.json(joinRequests);
}

export async function POST(req: Request) {
    const session = await auth();
    if(!session?.user) {
        return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    await connectDB();
    const body = await req.json();

    const existing = await JoinRequest.findOne({
        eventId : body.eventId,
        userId: session.user.id
    })

    if (existing) {
        return NextResponse.json({error: "You have already sent a join request for this event"}, {status: 400});
    }

    const joinRequest = await JoinRequest.create({
        eventId: body.eventId,
        message: body.message,
        userId: session.user.id,
    });


    return NextResponse.json(joinRequest);
}