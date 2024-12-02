import { hashPassword } from '../../../db/auth';
import { connectToDb } from '../../../db/db';
async function handler(req, res) {
    try {
        if (req.method === 'POST') {
            const data = req.body;
            console.log('data', data);
            const { email, password } = data;
            if (!email || !password || password.length < 8) {
                sendResponse(res, 422, 'Invalid input');
            }
            const client = await connectToDb();

            const db = client.db('nextjscourse');

            await db.collection('users').insertOne({ email, password: await hashPassword(password) });
            client.close();
            sendResponse(res, 201, 'User created!');
        }
    } catch (error) {
        sendResponse(res, 500, error.message);
    }
}

function sendResponse(res, status, message) {
    res.status(status).json({ message: message });
}

export default handler;