import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { connectToDatabase } from '@/lib/dbConnect';
import User from '@/models/auth/user';
import OtpModel from '@/models/auth/otp';

const SECRET_KEY = process.env.SECRET_KEY
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS)
const OTP_EXPIRY_MINUTES =Number(process.env.OTP_EXPIRY_MINUTES)+2

export async function POST(request: NextRequest) {
    await connectToDatabase();
    try {
        const body = await request.json();
        const { userId, otp, password } = body;

        if (!userId || !otp || !password) {
            return NextResponse.json({ message: 'User ID, OTP, and password are required' }, { status: 201 });
        }

        // Find the OTP record for the user
        const otpRecord = await OtpModel.findOne({ user: userId, otp, isDeleted: false });

        if (!otpRecord) {
            return NextResponse.json({ message: 'Invalid OTP or OTP has been deleted' }, { status: 201 });
        }

        // Check if OTP is verified and not expired
        const currentTime = new Date();
        const otpUpdatedAt = otpRecord.updatedAt;
        const otpExpiryTime = new Date(otpUpdatedAt.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

        if (!otpRecord.isVerified) {
            return NextResponse.json({ message: 'OTP is not verified' }, { status: 201 });
        }

        if (currentTime > otpExpiryTime) {
            return NextResponse.json({ message: 'OTP has expired' }, { status: 201 });
        }

        otpRecord.isDeleted = true;
        await otpRecord.save();
        // OTP is valid, hash the new password
        const hashedPassword = await bcrypt.hash(password + SECRET_KEY, SALT_ROUNDS);

        // Update the user's password
        await User.findByIdAndUpdate(userId, { password: hashedPassword ,updatedAt:currentTime});

        return NextResponse.json({ message: 'Password updated successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error updating password:', error);
        return NextResponse.json({ message: 'Failed to update password' }, { status: 500 });
    } 
}
