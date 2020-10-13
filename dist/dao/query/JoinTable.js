"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 联合查询的
 */
const Sql_1 = __importDefault(require("../sql/Sql"));
class JoinTable {
    /**
     * 联合查询
     * @param table  联合查询的表名
     * @param col 主表的字段 默认是xxx_id
     * @param id 次表的字段 默认id
     */
    constructor(table, col, id) {
        this.type = 'inner';
        this.table = table;
        if (col == null)
            col = table + '_id';
        if (id == null) {
            id = col;
        }
        this.col = col;
        this.id = id;
    }
    setType(val) {
        this.type = val;
        return this;
    }
    /**
     * 设置别名
     */
    setAlias(val) {
        this.alias = val;
        return this;
    }
    /**
     * 返回表格别名
     */
    acqAlias() {
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
    toSqlStr(tableName) {
        let table = this.acqTable();
        let alias = this.acqAlias();
        var main = this.main;
        if (main == null)
            main = tableName;
        return `${this.type} join ${table} on  ${main}.${this.col}=${alias}.${this.id}`;
    }
    toSql(tableName) {
        return new Sql_1.default(this.toSqlStr(tableName));
    }
    /**
     * 设置主表名称
     * @param main 主表名称
     */
    setMain(main) {
        this.main = main;
        return this;
    }
}
exports.default = JoinTable;
