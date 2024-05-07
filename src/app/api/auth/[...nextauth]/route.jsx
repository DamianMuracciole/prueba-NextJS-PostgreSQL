import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from '@/libs/prisma';
import bcrypt from 'bcrypt'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "user@mail.com" },
        password: { label: "Password", type: "password" , placeholder: "********" },
      },
      async authorize(credentials, req) { 
        const userFound = await prisma.users.findUnique({
          where: {
            email: credentials.email
          }
        })
        if (!userFound) throw new Error('Email no encontrado')
        
        const matchPassword = await bcrypt.compare(credentials.password, userFound.password)
        if (!matchPassword) throw new Error('Contraseña no válida');
        
        const user = {
          id: userFound.id,
          name: userFound.username,
          email: userFound.email,
          image: userFound.avatar
        }
        return user
      }
    })
  ],
  pages: {
    signIn: '/auth/login',
  },
  // session: {
  //   jwt: true,
  //   // maxAge está en segundos
  //   maxAge: 24 * 60 * 60, // 1 día
  // }
}

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}