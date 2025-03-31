import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import jwt from 'jsonwebtoken';
import AccessToken from '@/models/auth/accessToken';

const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_VALIDITY_DAYS = Number(process.env.TOKEN_VALIDITY_DAYS);

export async function POST(request: NextRequest) {
    await connectToDatabase();

    // Get the token from cookies
    const token = request.cookies.get('accessToken')?.value;

    if (!token) {
        return NextResponse.json({ status: 401 });
    }

    try {
        // Verify JWT
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        // Find the token record by comparing the raw token
        const accessTokenRecord = await AccessToken.findOne({ user: userId, accessToken: token });
        if (!accessTokenRecord) {
            return NextResponse.json({ status: 401 });
        }

        // Check if the token is marked as deleted
        if (accessTokenRecord.isDeleted) {
            return NextResponse.json({ message: "It seems you’ve used this app on another device, so please log in again." }, { status: 201 });
        }

        // Check if the token is expired
        const tokenAgeInDays = (Date.now() - accessTokenRecord.createdAt.getTime()) / (1000 * 60 * 60 * 24);
        if (tokenAgeInDays > TOKEN_VALIDITY_DAYS) {
            return NextResponse.json({ message: "but it looks like your session has expired, so you'll need to log in again." }, { status: 201 });
        }

        // Token is valid
        return NextResponse.json({ message: 'Token is valid' }, { status: 200 });
    } catch (error) {
        console.error('Error verifying token:', error);
        return NextResponse.json({ status: 500 });
    }
}
