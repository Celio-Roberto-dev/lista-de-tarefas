import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { findUserByCredentials } from "./lib/user"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await findUserByCredentials(
          credentials.email as string,
          credentials.password as string
        )

        if (!user) {
          return null
        }

        // NextAuth exige que o id seja STRING aqui
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      // Primeiro login
      if (user) {
        token.id = user.id
        token.name = user.name
        token.email = user.email
      }

      return token
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = String(token.id)
      }

      return session
    },
  },
})