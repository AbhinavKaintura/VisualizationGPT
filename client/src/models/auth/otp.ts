import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "@/models/auth/user";

export interface IOtp extends Document {
    user: IUser["_id"],
    otp: number,
    createdAt: Date,
    updatedAt: Date,
    isVerified:boolean,
    chancesLeft:number
    isDeleted: boolean,
}

const OtpSchema: Schema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    otp: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isVerified: { type: Boolean, default: false },
    chancesLeft:{type:Number, default:3},
    isDeleted: { type: Boolean, default: false }
});

const OtpModel: Model<IOtp> = mongoose.models.otp || mongoose.model<IOtp>("otp", OtpSchema);

export default OtpModel;
