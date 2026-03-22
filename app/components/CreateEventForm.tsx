"use client";

import { useState } from "react";

interface Props {
    latitude: number;
    longitude: number;
    onClose: () => void;
    onEventCreated: () => void;
}
//we use interface so that typescript knows what the component expects and the types those values are.

export default function CreateEventForm({latitude, longitude, onClose, onEventCreated}: Props) {
        const [title, setTitle] = useState("");
        const [description, setDescription] = useState("");
        const [time, setTime] = useState("");
        const [loading, setLoading] = useState(false);

        async function handleSubmit() {
            if(!title || !description || !time) return; 
            //returns early when any field is empty

            setLoading(true); //set loading to true

            await fetch("/api/events", {
                method: "POST",
                headers: { "Content-Type" : "application/json" },
                body: JSON.stringify({ title, description, latitude, longitude, time})
            });

            setLoading(false); //set loading to false after fetch is done

            onEventCreated();
            onClose();
        }


    return (
        <div style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            backgroundColor: "grey",
            color: "aliceblue",
            padding: "20px",
            borderRadius: "12px",
            width: "300px",
            zIndex: 999,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            cursor: "auto",
            }}>

                <h2>SET EVENT</h2>

            <input 
            style={{
                position: "relative",
                border: "solid",
                borderColor: "black",
                borderRadius: "12px",
                marginBottom: "10px",
                cursor: "text",
                pointerEvents: "auto",
                zIndex: 1000,
            }}
            type="text" 
            value={title} 
            onChange= {(e)=> setTitle(e.target.value)} />

            <textarea 
            style={{
                position: "relative",
                border: "solid",
                borderColor: "black",
                borderRadius: "12px",
                cursor: "text",
                pointerEvents: "auto",
                zIndex: 1000,
            }}
            value={description} 
            onChange= {(e)=> setDescription(e.target.value)} 
            />

            <input
            style={{
                border: "solid",
                borderColor: "black",
                borderRadius: "6px",
                cursor: "pointer",
                pointerEvents: "auto",
                zIndex: 1000,
            }} 
            type="datetime-local" 
            value={time} 
            onChange= {(e)=> setTime(e.target.value)} />
            
            <p>Coordinates: {latitude.toFixed(3) + "," + longitude.toFixed(3)}</p>

            <button
            style={{
                border: "solid",
                borderColor: "black",
                borderRadius: "5px",
            }}
             onClick={() => handleSubmit()}>
                {loading ? "Posting" : "Submit"}
            </button>

            <button 
            style={{
                border: "solid",
                borderColor: "black",
                borderRadius: "5px",
                marginLeft: "10px",
            }}
            onClick={() => onClose() }> Cancel </button>
        </div>
    )
}
