import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { storage } from '@/lib/db/mockData';
// In a real application, you would use a library like bcrypt to handle password hashing.
// For this example, we are using plain text passwords for the mock users.
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'test@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const user = storage.users.find(u => u.email === credentials.email);

        if (user) {
          // This logic handles both plain text passwords for mock users and hashed passwords for new users.
          const isPasswordHashed = user.password.includes('$2b$');
          const isValid = isPasswordHashed
            ? await bcrypt.compare(credentials.password, user.password)
            : user.password === credentials.password;

          if (isValid) {
            return { id: user.id, name: user.name, email: user.email, role: user.role };
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        // @ts-expect-error
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // @ts-expect-error
        session.user.id = token.id;
        // @ts-expect-error
        session.user.role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || 'your-super-secret-key-for-development', // In production, use a strong secret from environment variables
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
