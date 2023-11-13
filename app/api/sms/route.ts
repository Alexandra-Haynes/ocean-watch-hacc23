import { PrismaClient } from "@prisma/client";
const accountSid = 'ACc42239c6272c09649843c692d2e723f9';
const authToken = '259f2446654ccae325432e3b343d9eb1';
const client = require('twilio')(accountSid, authToken);

const prisma = new PrismaClient();

export async function POST(req: Request) {
    const formData = await req.json();
    const message = formData['message'];
    console.log('message', message);

    client.messages
        .create({
            body: 'Thanks for submitting a report! Our team of high trained marine biologists will be on the case shortly.',
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+18083880313'
        })
        .then((message: any) => console.log(message.sid));

    return Response.json({
        Fuck: "This"
    });
}
