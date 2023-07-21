import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDatabase } from "@utils/database";
import User from "@models/user";

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async session({ session }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ account, profile, user, credentials }) {
      try {
        // serverless --> Lambda --> DynamoDB (vždycky, když je tato funkce zavolána, oznámíme to serveru, který tím pádem nemusí běžet konstantně)
        await connectToDatabase();

        // check if a user already exists

        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
