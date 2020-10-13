import Inquiry from "./Inquiry";
export default class ProxyInquiry extends Inquiry {
    couldSaveAll(): boolean;
    _couldSave(): boolean;
    find(param: any): Promise<any>;
    protected _filter(list: any): Promise<any>;
}
