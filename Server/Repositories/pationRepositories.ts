import Patient from '../Models/patientPropileModels';
import { PatientUpdateRequestDto, PatientGetRequestDto, PatientCreateRequestDto  } from '../Dto/pation.Dto';
export class PatientRepository {
    public readonly db = Patient;

    async CreatePatient(patientData: PatientCreateRequestDto) {
        return this.db.create(patientData);
    }

    async UpdatePatientRecord(patientData: PatientUpdateRequestDto) {
        return await this.db.findByIdAndUpdate(patientData._id, { $push: { records: patientData.records } }, { upsert: true });
    }

    async GetPatientRecord(patientData: PatientGetRequestDto) {
        return await this.db.find({ phone_no: patientData.phone_no }).populate('records').exec()
    }
}
