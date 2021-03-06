import { DoctorCreateRequestDto, DoctorGetRequestDto } from '../Dto/doctor.Dto'
import { DoctorRepository } from '../Repositories/doctorRepositories'

export default class DoctorServices{

    constructor(public doctorRepo: DoctorRepository) {}

    async registerDoctorSave(doctorData: DoctorCreateRequestDto) {
        const doctor = await this.doctorRepo.CreateDoctor(doctorData);

        return DoctorCreateRequestDto.from(doctor);
    }

    async GetDoctor(doctorNametData: DoctorGetRequestDto) {
        const doctor = await this.doctorRepo.GetDoctor(doctorNametData);

        return doctor;
    }
}