import { DoctorCreateRequestDto } from '../Dto/doctor.Dto';
import doctorModels from '../Models/doctorModels';
import doctorInterface from '../Interfaces/doctorInterface';
export class DoctorRepository {
    public readonly db = doctorModels;

    async CreateDoctor(doctorData: DoctorCreateRequestDto) {
        return this.db.create(doctorData);
    }

}
