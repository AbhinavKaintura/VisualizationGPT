import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import User from '@/models/auth/user';
import OtpModel from '@/models/auth/otp';
import { sendEmail } from '@/lib/email'; // Import the sendEmail function

export async function POST(request: NextRequest) {
    await connectToDatabase();
    const OTP_EXPIRY_MINUTES =Number(process.env.OTP_EXPIRY_MINUTES)

    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json({ message: 'Email is required' }, { status: 201 });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json({ message: 'Invalid User' }, { status: 201 });
        }

        if (!user.isVerified) {
            return NextResponse.json({ message: 'User is not verified' }, { status: 201 });
        }

        // Generate a new OTP
        const otp = Math.floor(100000 + Math.random() * 900000);
        const existingOtp = await OtpModel.findOne({ user: user._id, isDeleted: false });

        const currentTime = new Date();
        let otpDocument;

        if (existingOtp) {
            const otpExpiryTime = new Date(existingOtp.updatedAt.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

            if (currentTime > otpExpiryTime) {
                // OTP is expired, mark it as deleted and create a new one
                existingOtp.isDeleted = true;
                await existingOtp.save();

                otpDocument = new OtpModel({
                    user: user._id,
                    otp,
                });
            } else {
                // Update the existing OTP
                existingOtp.otp = otp;
                existingOtp.updatedAt = currentTime;
                existingOtp.chancesLeft = 3;
                otpDocument = existingOtp;
            }
        } else {
            // No existing OTP, create a new one
            otpDocument = new OtpModel({
                user: user._id,
                otp,
            });
        }

        await otpDocument.save();

        // Send the new OTP to the user's email
        await sendEmail(user.email, otp);

        return NextResponse.json({
            message: 'OTP sent to email successfully',
            userId: user._id,
        }, { status: 200 });
    } catch (error) {
        console.error('Error resending OTP:', error);
        return NextResponse.json({ message: 'Failed to resend OTP' }, { status: 500 });
    }
}
