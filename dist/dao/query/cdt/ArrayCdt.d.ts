import BaseCdt from './BaseCdt';
import Sql from '../../sql/Sql';
export default abstract class ArrayCdt extends BaseCdt {
    protected _array: Array<BaseCdt>;
    addCdt(baseCdt: BaseCdt): ArrayCdt;
    /**
     * 增加相等条件
     * @param col 字段
     * @param val 值
     */
    eq(col: string, val: any): ArrayCdt;
    /**
     * 增加 in 查询
     * @param col 字段
     * @param val 查询数组
     */
    in(col: string, val: Array<any>): ArrayCdt;
    /**
     * 增加 in 查询
     * @param col 字段
     * @param val 查询数组
     */
    notIn(col: any, val: any): ArrayCdt;
    /**
     * 增加 like 查询
     * @param col 字段
     * @param val 查询值
     */
    like(col: string, val: any): ArrayCdt;
    /**
     * 增加 大于 查询
     * @param col 字段
     * @param val 查询值
     */
    big(col: string, val: any): ArrayCdt;
    /**
     * 增加 大于等于 查询
     * @param col 字段
     * @param val 查询值
     */
    bigEq(col: string, val: any): ArrayCdt;
    /**
     * 增加 小于 查询
     * @param col 字段
     * @param val 查询值
     */
    less(col: string, val: any): ArrayCdt;
    /**
     * 增加 小于等于 查询
     * @param col 字段
     * @param val 查询值
     */
    lessEq(col: string, val: any): ArrayCdt;
    /**
     * 增加 不等于 查询
     * @param col 字段
     * @param val 查询值
     */
    notEq(col: string, val: any): ArrayCdt;
    /**
     * 增加 为空 查询
     * @param col 字段
     */
    isNull(col: string): ArrayCdt;
    /**
     * 增加 不为空 查询
     * @param col 字段
     */
    isNotNull(col: string): ArrayCdt;
    protected toSqlStr(str: any): Sql;
}
