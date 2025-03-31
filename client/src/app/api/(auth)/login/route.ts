import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import User from '@/models/auth/user';
import AccessToken from '@/models/auth/accessToken';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET_KEY!;
const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_VALIDITY_DAYS = Number(process.env.TOKEN_VALIDITY_DAYS);

export async function POST(request: NextRequest) {
    await connectToDatabase();

    try {
        const { email, password } = await request.json();

        if (!email || !password) {
            return NextResponse.json({ message: 'Email and password are required' }, { status: 400 });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
        }

        const isPasswordValid = await bcrypt.compare(password + SECRET_KEY, user.password);
        if (!isPasswordValid) {
            return NextResponse.json({ message: 'Incorrect password' }, { status: 400 });
        }

        if (!user.isVerified) {
            return NextResponse.json({ message: 'User is not verified' }, { status: 400 });
        }

        const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '10h' });

        const existingToken = await AccessToken.findOne({ user: user._id, isDeleted: false });

        let responseMessage = 'Login successful';

        if (existingToken) {
            const tokenAgeInDays = (Date.now() - existingToken.createdAt.getTime()) / (1000 * 60 * 60 * 24);
            if (tokenAgeInDays >= TOKEN_VALIDITY_DAYS) {
                existingToken.isDeleted = true;
                existingToken.updatedAt = new Date();
                await existingToken.save();
            } else {
                const response = NextResponse.json({ message: responseMessage }, { status: 200 });
                response.cookies.set("accessToken", accessToken, {
                    httpOnly: false,
                  });
                  response.cookies.set("userName", user.username, {
                    httpOnly: false,
                  });
                return response;
            }
        }

        const newAccessToken = new AccessToken({
            user: user._id,
            accessToken: accessToken, // Store the raw token
            createdAt: new Date(),
            updatedAt: new Date(),
            isDeleted: false,
        });

        await newAccessToken.save();

        const response = NextResponse.json({ message: responseMessage }, { status: 200 });
        response.cookies.set('accessToken', accessToken, {
            httpOnly: false,
          });
          response.cookies.set("userName", user.username, {
            httpOnly: false,
          });
        return response;

    } catch (error) {
        console.error('Error logging in:', error);
        return NextResponse.json({ message: 'Failed to log in' }, { status: 500 });
    }
}
