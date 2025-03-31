import mongoose, { Model, Schema, Document } from "mongoose"
import { IUser } from "@/models/auth/user"

export interface IAccessToken extends Document {
    user: IUser["_id"];
    accessToken: string;
    createdAt: Date;
    updatedAt: Date;
    isDeleted: boolean;
}

const accessTokenSchema: Schema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    accessToken: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
})

const Token: Model<IAccessToken> = mongoose.models.Token || mongoose.model<IAccessToken>("Token", accessTokenSchema)

export default Token;