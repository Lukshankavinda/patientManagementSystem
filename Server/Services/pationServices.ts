import { PatientCreateRequestDto } from '../Dto/pation.Dto';
import { PatientRepository } from '../Repositories/pationRepositories';
import { PatientUpdateRequestDto, PatientGetRequestDto } from '../Dto/pation.Dto';

export class PatientService {
    constructor(public patientRepo: PatientRepository) {}

    async createPatient(patientData: PatientCreateRequestDto) {
        const patient = await this.patientRepo.CreatePatient(patientData);

        return PatientCreateRequestDto.from(patient);
    }

    async UpdatePatientRecord(patientData: PatientUpdateRequestDto) {
        const patient = await this.patientRepo.UpdatePatientRecord(patientData);

        return patient;
    }

    async GetPatientRecord(patientData: PatientGetRequestDto) {
        const patient = await this.patientRepo.GetPatientRecord(patientData);

        return patient;
    }

}
