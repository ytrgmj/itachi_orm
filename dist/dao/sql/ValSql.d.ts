import Sql from './Sql';
/**
 * 1. 每种 sql, 对于 value 的占位符并不相同, mysql: ? pg: $num
 */
export default class ValSql extends Sql {
    private val;
    /**
     * @description sql 参数化处理
     * @param val
     */
    constructor(val: any);
    /**
     * @description sql 参数化处理
     * @param type
     * @param count
     */
    toSql(type?: string, count?: object): string;
    protected sqlStrAfterProcessing(val: any, parmeterSqlStr: string): string;
    toVal(): any;
    /**
     * @description sql 中的一个 value, 不支持 add, 一个 value 一个实例
     */
    add(): Sql;
}
