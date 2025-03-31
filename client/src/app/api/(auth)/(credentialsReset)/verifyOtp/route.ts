import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/dbConnect';
import OtpModel from '@/models/auth/otp';

const OTP_EXPIRY_MINUTES =Number(process.env.OTP_EXPIRY_MINUTES)

export async function POST(request: NextRequest) {
    await connectToDatabase();

    try {
        const body = await request.json();
        const { userId, otpValue } = body;

        if (!userId || !otpValue) {
            return NextResponse.json({ message: 'User ID and OTP are required' }, { status: 201 });
        }

        // Find the OTP record for the user
        const otpRecord = await OtpModel.findOne({ user: userId, isDeleted: false });

        if (!otpRecord) {
            return NextResponse.json({ message: 'No OTP found' }, { status: 201 });
        }
        if(otpRecord&&otpRecord.otp!==otpValue){
            otpRecord.chancesLeft -= 1;
            await otpRecord.save();
            return NextResponse.json({ message: 'Invalid OTP' }, { status: 201 });
        }
        if(otpRecord&&otpRecord.chancesLeft<1){
            return NextResponse.json({ message: 'Otp expired due to Multiple wrong Try' }, { status: 201 });
        }
        // Check if OTP is expired
        const currentTime = new Date();
        const otpCreatedAt = otpRecord.updatedAt; // assuming `updatedAt` is set when OTP is generated
        const otpExpiryTime = new Date(otpCreatedAt.getTime() + OTP_EXPIRY_MINUTES * 60 * 1000);

        if (currentTime > otpExpiryTime) {
            // OTP is expired
            otpRecord.isDeleted = true; // Mark OTP as deleted
            await otpRecord.save();
            return NextResponse.json({ message: 'OTP has expired' }, { status: 201 });
        }

        // OTP is valid and not expired
        otpRecord.isVerified = true;
        await otpRecord.save();

        return NextResponse.json({ message: 'OTP verified successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error verifying OTP:', error);
        return NextResponse.json({ message: 'Failed to verify OTP' }, { status: 500 });
    }
}
