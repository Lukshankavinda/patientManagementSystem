import doctorInterface from '../Interfaces/doctorInterface';
export class DoctorCreateRequestDto {
    constructor(
        public readonly email: string | undefined,
        public readonly name: string | undefined,
        public readonly phone_no: Number | undefined,
        public readonly password: string | undefined
    ) {}

    static from(body: Partial<DoctorCreateRequestDto>): DoctorCreateRequestDto {
        return new DoctorCreateRequestDto(body.email, body.name, body.phone_no, body.password);
    }

    static fromMany(doctors: doctorInterface[]) {
        return doctors.map((doctor) => DoctorCreateRequestDto.from(doctor));
    }
}
