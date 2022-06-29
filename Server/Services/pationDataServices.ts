import { ReportcreateReqDto, RecordGetRequestDto } from '../Dto/pationData.Dto';
import { RecordsRepository } from '../Repositories/pationDataRepositories';

export class RecordsService {
    constructor(public recordRepo: RecordsRepository) {}

    async createR(recordData: ReportcreateReqDto) {
        const record = await this.recordRepo.CreateRecord(recordData);

        return record;
    }

    async GetRecord(recordData: RecordGetRequestDto) {
        const patient = await this.recordRepo.GetRecord(recordData);

        return patient
    }
}
