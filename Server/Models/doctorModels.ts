import mongoose, { Schema } from 'mongoose';
import doctorInterface from '../Interfaces/doctorInterface';

const DoctorsSchema: Schema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        phone_no: { type: String, unique: true },
        password: { type: String, required: true }
    },
    {
        timestamps: true
    }
);

export default mongoose.model<doctorInterface>('Doctors', DoctorsSchema);
