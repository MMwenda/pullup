"use client";

import { SessionProvider } from "next-auth/react";

//NextAuth needs to wrap your whole app so any component can access the session
export default function Providers({ children }: {children: React.ReactNode}) 
//: { children: React.ReactNode } is a TypeScript type annotation for the props object. 
// It says this component expects one prop named children, and its type is React.ReactNode.
//React.ReactNode means “anything React can render,
{
    return <SessionProvider>{children}</SessionProvider>
}

//this allows for any component to be able to call useSession() toknow if the user is logged in

