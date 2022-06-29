import patientPropileInterface from "../Interfaces/patientPropileInterface";
export class PatientCreateRequestDto {
    constructor(
        public readonly first_name: string | undefined,
        public readonly last_name: string | undefined,
        public readonly phone_no: Number | undefined,
        public readonly dob: string | undefined,
        public readonly gender: string | undefined,
        public readonly records: Array<string> | undefined
    ) {}

    static from(body: Partial<PatientCreateRequestDto>): PatientCreateRequestDto {
        return new PatientCreateRequestDto(body.first_name, body.last_name, body.phone_no, body.dob, body.gender,body.records);
    }

    static fromMany(patients: patientPropileInterface[]) {
        return patients.map((patient) => PatientCreateRequestDto.from(patient));
    }
}


export class PatientUpdateRequestDto {
    constructor(
       
        public readonly _id: string | undefined,
        public readonly records: Array<string> | undefined,
    ) {}

    static from(data: Partial<PatientUpdateRequestDto>): PatientUpdateRequestDto {
        return new PatientUpdateRequestDto(
           
            data._id,
            data.records
        );
    }

}

export class PatientGetRequestDto {
    constructor(
        public readonly phone_no: string | undefined,
      //  public readonly _id: string | undefined,
       
    ) {}

    static from(body: Partial<PatientCreateRequestDto>): PatientCreateRequestDto {
        return new PatientCreateRequestDto(body.first_name, body.last_name, body.phone_no, body.dob, body.gender,body.records);
    }


}
