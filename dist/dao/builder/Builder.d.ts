import DaoOpt from '../opt/DaoOpt';
export default abstract class Builder {
    protected _opt: DaoOpt;
    abstract build(obj: any, opts?: any): any;
    constructor(opt: any);
}
