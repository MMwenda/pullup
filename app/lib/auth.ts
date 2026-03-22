import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "./mongoose";
import User from "./models/User";


//providers = which sign in methode:
//1. Google, 2. Credentials (email/password)

//adapters = where users are stored


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;//no email or password inputted, return null

        await connectDB();

        const user = await User.findOne({ email: credentials.email }); //check if email matches an existing one
        if (!user) return null; //if not return null

        const passwordMatch = await bcrypt.compare(
          credentials.password as string,
          user.password
        ); //compares if passwords match

        if (!passwordMatch) return null; //if not...

        return { //if all true, sign in
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],




  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") { //if porvider is google
        //*?. is the optional chaining operator- of null or undefined is thrown it safely returns undefined instead of crashing
        await connectDB();

        const existing = await User.findOne({ email: user.email });

        if (!existing) { //if not existing, create a user
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
          });

          //**** CREDENTIALS SIGN UP IS ON app/api/auth/register/route.ts** */
        }
      }
      return true;
    },

    async session({ session, token }) { //attaches the user's id to the session in order to be able to access it anywhere
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },

    async jwt({ token, user }) { 
      if (user) {
        token.sub = user.id; //stores the user id in the token
      }
      return token;
    },
  },

  session: {  
    strategy: "jwt", //sessions are stored in a token in the browser, not in the dbs
  },

  pages: {
    signIn: "/auth/signin", //tells NextAuth to use our own sign in page
  },
});