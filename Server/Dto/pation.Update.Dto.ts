import patientDataInterface from "../Interfaces/patientDataInterface";
export class PatientUpdateRequestDto {
    constructor(
        public readonly _id: string | undefined,
        public readonly records: Array<string> | undefined,
    ) {}

    static from(body: Partial<PatientUpdateRequestDto>): PatientUpdateRequestDto {
        return new PatientUpdateRequestDto(
            body._id,
            body.records
        );
    }

}