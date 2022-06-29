import { Document } from "mongoose";

export default interface doctorInterface extends Document {
    email: string;
    name: string;
    phone_no: number;
    password: string;
}
