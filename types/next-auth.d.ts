import NextAuth from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    name?: string | null
    email?: string | null
    country?: string | null
  }

  interface Session {
    user: User
  }

  interface JWT {
    id: string
    country?: string | null
  }
}