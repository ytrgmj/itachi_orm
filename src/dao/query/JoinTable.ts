/**
 * 联合查询的
 */
import Sql from '../sql/Sql'

export default class JoinTable {
    private type: string = 'inner';
    private table: string;
    private main: string;
    /**
     * 主表的字段名称
     */
    private id: string;
    private alias: string;
    private col: string;


    /**
     * 联合查询
     * @param table  联合查询的表名
     * @param col 主表的字段 默认是xxx_id
     * @param id 次表的字段 默认id
     */
    constructor(table: string, col?: string, id?: string) {
        this.table = table;
        if (col == null)
            col = table + '_id';
        if (id == null) {
            id = col;
        }
        this.col = col;
        this.id = id;

    }

    setType(val): JoinTable {
        this.type = val;
        return this;
    }
    /**
     * 设置别名
     */
    setAlias(val: string): JoinTable {
        this.alias = val;
        return this;
    }
    /**
     * 返回表格别名
     */
    acqAlias(): string {
        if (this.alias != null)
            return this.alias;
        return this.table;
    }

    /**
     * fanh
     */
    acqTable() {
        let table = this.table;
        if (this.alias) {
            table = table + ' ' + this.alias;
        }
        return table;
    }

    toSqlStr(tableName: string): string {
        let table = this.acqTable();
        let alias = this.acqAlias()
        var main = this.main;
        if (main == null)
            main = tableName;
        return `${this.type} join ${table} on  ${main}.${this.col}=${alias}.${this.id}`
    }

    toSql(tableName: string) {
        return new Sql(this.toSqlStr(tableName));
    }
    /**
     * 设置主表名称
     * @param main 主表名称
     */
    setMain(main: string): JoinTable {
        this.main = main;
        return this;
    }
}