import { ReportcreateReqDto,  RecordGetRequestDto } from '../Dto/pationData.Dto';
import PatientMedicalRecord from '../Models/patientDataModels';

export class RecordsRepository {
    public readonly db = PatientMedicalRecord;

    async CreateRecord(recordData: ReportcreateReqDto) {
        return this.db.create(recordData);
    }

    async GetRecord(recordData: RecordGetRequestDto) {
        return await this.db.findById(recordData)
    }
}
