import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
              email: { label: "Email", type: "text" },
              password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
              if (!credentials?.email || !credentials?.password) {
                throw new Error("Email and password required");
              }
              
              const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth/login`, {
                method: 'POST',
                body: JSON.stringify(credentials),
                headers: { "Content-Type": "application/json" }
              });
          
              if (res.ok) {
                const user = await res.json();
                return user;
              } else {
                console.error('Login failed:', await res.text());
                return null;
              }
            }
        })
    ],
    pages: {
        signIn: '/login',
    },
    callbacks: {
      async jwt({ token, user, trigger, session }) {
          if (trigger === "update" && session?.country) {
              token.country = session.country;
          }
          if (user) {
              token.id = user.id;
              token.country = user.country;
          }
          return token;
      },
      async session({ session, token }) {
          session.user = {
              id: token.id as string,
              name: token.name,
              email: token.email,
              country: token.country as string
          };
          return session;
      },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };