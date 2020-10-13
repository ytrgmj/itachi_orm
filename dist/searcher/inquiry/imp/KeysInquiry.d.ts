import Inquiry from './Inquiry';
export default class KeysInquiry extends Inquiry {
    acqColKeys(): any;
    _acqCodeByKeys(params: any): string;
    acqCode(params: any): string;
    acqDataCode(data: any): string;
    protected _buildCdt(params: any): Promise<any>;
    private _buildArrayCdt;
    private _buildKeyCdt;
}
