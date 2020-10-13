/**
 * 联合查询的
 */
import Sql from '../sql/Sql';
export default class JoinTable {
    private type;
    private table;
    private main;
    /**
     * 主表的字段名称
     */
    private id;
    private alias;
    private col;
    /**
     * 联合查询
     * @param table  联合查询的表名
     * @param col 主表的字段 默认是xxx_id
     * @param id 次表的字段 默认id
     */
    constructor(table: string, col?: string, id?: string);
    setType(val: any): JoinTable;
    /**
     * 设置别名
     */
    setAlias(val: string): JoinTable;
    /**
     * 返回表格别名
     */
    acqAlias(): string;
    /**
     * fanh
     */
    acqTable(): string;
    toSqlStr(tableName: string): string;
    toSql(tableName: string): Sql;
    /**
     * 设置主表名称
     * @param main 主表名称
     */
    setMain(main: string): JoinTable;
}
