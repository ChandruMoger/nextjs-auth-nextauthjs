import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDb } from "../../../db/db";
import { comparePassword } from "../../../db/auth";
export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials) {
                const client = await connectToDb();
                const usersCollection = client.db('nextjscourse').collection('users');

                const user = await usersCollection.findOne({ email: credentials.email });

                if (!user) {
                    client.close();
                    throw Error('No user found');
                }

                const verifyPass = await comparePassword(credentials.password, user.password);

                if (!verifyPass) {
                    client.close();
                    throw Error('password in invalid');
                }
                client.close();
                return { email: user.email }
            }
        })
    ]
})