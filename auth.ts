import Credentials from "next-auth/providers/credentials";
import { USER_API, USER_AUTH_API } from "@/config/api-endpoints";
import NextAuth from "next-auth";
import type { JWT } from "next-auth/jwt";
import { getData } from "./app/api/lib/proxy-fetcher";
import bcrypt from "bcryptjs";
import { SIGNIN_PAGE } from "./config/constants";
import type { AdapterUser } from "next-auth/adapters";

// Extend the user and token types
interface ExtendedUser extends AdapterUser {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
  emailVerified: Date | null;
}

interface ExtendedToken extends JWT {
  id: string;
  firstname: string;
  lastname: string;
  role: string;
  email: string;
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        const { email, password } = credentials;
        const user = await getData(`${USER_AUTH_API}?email=${email}`);

        const passwordMatch: boolean = await bcrypt.compare(
          password,
          user?.password
        );
        console.log("PasswordMatch : ",passwordMatch);
        if (passwordMatch) {
          const userInfo = await getData(`${USER_API}?email=${email}`);
          return userInfo[0];
        } 

          return null;
        
      },
    }),
  ],

  pages: {
    signIn: SIGNIN_PAGE,
    signOut: SIGNIN_PAGE,
  },

  session: {
    strategy: "jwt",
  },

  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
       
        token.id = user.id;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.role = user.role;
        token.email = user.email;
        token.emailVerified = null; 
      }
      return token;
    },

    async session({ session, token }) {    
      session.user = {
        id: token.id as string,
        firstname: token.firstname as string,
        lastname: token.lastname as string,
        role: token.role as string,
        email: token.email as string,
        emailVerified: null,
      };
      return session;
    },
  },
});
