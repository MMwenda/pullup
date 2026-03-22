import { handlers } from "@/app/lib/auth";

export const { GET, POST } = handlers;

//The [...nextauth] folder name means it catches all routes under /api/auth/. 
// So /api/auth/signin, /api/auth/callback/google, /api/auth/signout all get handled by this one file.