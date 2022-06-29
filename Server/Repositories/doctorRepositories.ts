import { DoctorCreateRequestDto, DoctorGetRequestDto } from '../Dto/doctor.Dto';
import doctorModels from '../Models/doctorModels';
import doctorInterface from '../Interfaces/doctorInterface';
export class DoctorRepository {
    public readonly db = doctorModels;

    async CreateDoctor(doctorData: DoctorCreateRequestDto) {
        return this.db.create(doctorData);
    }

    async GetDoctor(doctorNametData: DoctorGetRequestDto) {
        return await this.db.find({ email: doctorNametData.email })
    }

}
