export default class DaoOpt {
    _opt: any;
    constructor(opt: any);
    /**
     * 返回表名
     */
    getTableName(): string;
    /**
     * @returns poolName
     */
    getPoolName(): string;
    /**
     * 返回id列表
     */
    acqIds(): Array<string>;
    /**
     * 是否 id
     * @param col
     */
    isId(col: string): boolean;
    /**
     * 是否自增
     */
    isIncrement(): boolean;
    /**
     * 返回首个id
     */
    acqFirstId(): string;
}
