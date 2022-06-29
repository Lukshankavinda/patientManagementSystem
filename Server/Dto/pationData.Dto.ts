import patientDataInterface from "../Interfaces/patientDataInterface";
export class ReportcreateReqDto {
    constructor(
        public readonly treatment: Array<string> | undefined,
        public readonly complaint: string | undefined,
        public readonly illness: Array<string> | undefined,
        public readonly pulse: string | undefined,
        public readonly blood_pressure: string | undefined,
        public readonly weight: string | undefined
    ) {}

    static from(body: Partial<ReportcreateReqDto>): ReportcreateReqDto {
        return new ReportcreateReqDto(
            body.treatment,
            body.complaint,
            body.illness,
            body.pulse,
            body.blood_pressure,
            body.weight
        );
    }

    static fromMany(records: patientDataInterface[]) {
        return records.map((record) => ReportcreateReqDto.from(record));
    }
}

export class RecordGetRequestDto {
    constructor(
        public readonly _id: string | undefined,
       
    ) {}

    static from(body: Partial<RecordGetRequestDto>): RecordGetRequestDto {
        return new RecordGetRequestDto( body._id);
    }
}
