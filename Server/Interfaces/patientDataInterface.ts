import { Document } from 'mongoose';

export default interface patientDataInterface extends Document {
    complaint: string;
    blood_pressure: string;
    pulse: string;
    illness: Array<string>;
    treatment: Array<string>;
    weight: string;
}
