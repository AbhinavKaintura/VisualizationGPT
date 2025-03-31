import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import User from '@/models/auth/user';
import { IUser } from '@/models/auth/user';
import bcrypt from 'bcrypt';

const SECRET_KEY = process.env.SECRET_KEY

export async function POST(request: NextRequest) {
    await connectToDatabase();

    try {
        const body = await request.json();
        const { name, age, companyName, email, password } = body;

        if (!name || !age || !companyName || !email || !password) {
            return NextResponse.json({ message: 'All fields are required' }, { status: 201 });
        }

        // Concatenate the password with the secret key and hash it
        const hashedPassword = await bcrypt.hash(password + SECRET_KEY, 10);

        const newUser: IUser = new User({
            username: name,
            email,
            password: hashedPassword,
            companyName,
            age,
        });

        await newUser.save();
        return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
    } catch (error) {
        console.error('Error registering user:', error);
        return NextResponse.json({ message: 'Failed to register user' }, { status: 500 });
    }
}
