"use client" ;
//mapbpx needs the browser to run, it cant run on the server
//this tells next.js to only render this component on the client side.


import CreateEventForm from "./CreateEventForm";
import {useState,useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

interface Event {
    _id: string;
    title: string;
    description: string;
    latitude: number;
    longitude: number;
    time: string;
}

export default function Map() {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);

    const [formCoords, setFormCoords] = useState<{lat: number; lng: number} | null>(null); //a state to listen and know where exactly on the map was clicked

    //useState<...> in typescript tell the state what type it holds
    //in this case it will hold an object with two number fields OR "|" null
    //>(null) - the value starts as null, meaning the form is hidden
    //so when the user hasnt clicked, formCoords is null (false) and so CreateEventForm is not rendered

    //we use useRef instead of state coz we dont want react to re-render everytime the map moves or changes. 
    // The map manages its own state


    function loadEvents() {
        if(!map.current) return;

        fetch("/api/events")
                .then((res) => {
                    if (!res.ok) throw new Error("Failed to fetch events");
                    return res.json();
                })
                .then((events: Event[]) => {
                    events.forEach((event) => {
                        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                            <div style="color: black;">
                            <h3 style="font-weight:bold; margin-bottom: 4px;"> ${event.title}</h3>
                            <p style="margin: 0; color:#333;">${event.description}</p>
                            </div>`);

                new mapboxgl.Marker()
                .setLngLat([event.longitude, event.latitude])
                .setPopup(popup)
                .addTo(map.current!);
            });
                })
            .catch((err) => console.error("Error loading events:", err));
    }


    useEffect(() => {
        if(map.current) return;
        //prevent current map from being initialized twice in dev mode when react re-renders twice (returns early)

        map.current = new mapboxgl.Map({
            container: mapContainer.current!,
            style: "mapbox://styles/mapbox/dark-v11",
            center: [36.8219, -1.2921], //nairobi coordinates for now
            zoom: 12,
        });

        map.current.on("load", () => {
            map.current!.getCanvas().style.cursor = "crosshair";

            if (map.current) {
                map.current.on("click", (e) => {
                    console.log("clicked", e.lngLat);
                    setFormCoords({ lat: e.lngLat.lat, lng: e.lngLat.lng }); 
                })
            }
            // const res = await fetch("/api/events");
            // const events: Event[] = await res.json();

            loadEvents();
        })
    }, []);

    return (
        <div style={{position: "relative", width: "100%", height: "100vh"}}>
            <div ref={mapContainer} style={{width: "100%", height: "100%"}} />
                {formCoords && (
                    <CreateEventForm 
                    latitude={formCoords.lat}
                    longitude={formCoords.lng}
                    onClose={() => setFormCoords(null)}
                    onEventCreated={loadEvents}
                    />
                )}
        </div>
    );
}