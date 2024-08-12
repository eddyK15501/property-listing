import User from '@/models/User';
import connectDB from '@/config/connection';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      await connectDB();
      const getUser = await User.findOne({ email: profile.email });

      // console.log(profile);

      if (!getUser) {
        const username = profile.name.slice(0, 20);
        await User.create({
          email: profile.email,
          username,
          image: profile.picture,
        });
      }

      return true;
    },
    async session({ session, user, token }) {
      // console.log(session);
      const getUser = await User.findOne({ email: session.user.email });
      session.user.id = getUser._id.toString();

      return session;
    },
  },
};
