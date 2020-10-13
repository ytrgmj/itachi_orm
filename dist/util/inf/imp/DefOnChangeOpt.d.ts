import OnChangeOpt from '../OnChangeOpt';
export default class DefOnChangeOpt implements OnChangeOpt {
    private _opt;
    constructor(opt: OnChangeOpt);
    onAdd(dao: any, obj: any): Promise<void>;
    afterAdd(dao: any, obj: any): Promise<void>;
    onUpdate(dao: any, obj: any, opts?: any): Promise<void>;
    afterUpdate(dao: any, cnt: number, obj: any, opts?: any): Promise<void>;
    onDel?(dao: any, obj: any, opts?: any): Promise<void>;
    afterDel?(dao: any, cnt: number, obj: any, opts?: any): Promise<void>;
    onAddArray?(dao: any, arr: object[]): Promise<void>;
    afterAddArray?(dao: any, arr: object[]): Promise<void>;
    onUpdateArray?(dao: any, array: Array<any>, other?: object, whereObj?: any): Promise<void>;
    afterUpdateArray?(dao: any, cnt: number, array: Array<any>, other?: object): Promise<void>;
    onDelArray?(dao: any, array: Array<any>, opts?: any): Promise<void>;
    afterDelArray?(dao: any, cnt: number, array: Array<any>, opts?: any): Promise<void>;
}
