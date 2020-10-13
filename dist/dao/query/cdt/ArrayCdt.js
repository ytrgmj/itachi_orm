"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseCdt_1 = __importDefault(require("./BaseCdt"));
const Cdt_1 = __importDefault(require("./imp/Cdt"));
const IsNullCdt_1 = __importDefault(require("./imp/IsNullCdt"));
const IsNotNullCdt_1 = __importDefault(require("./imp/IsNotNullCdt"));
const Sql_1 = __importDefault(require("../../sql/Sql"));
class ArrayCdt extends BaseCdt_1.default {
    constructor() {
        super(...arguments);
        this._array = [];
    }
    addCdt(baseCdt) {
        if (baseCdt) {
            this._array.push(baseCdt);
        }
        return this;
    }
    /**
     * 增加相等条件
     * @param col 字段
     * @param val 值
     */
    eq(col, val) {
        return this.addCdt(new Cdt_1.default(col, val));
    }
    /**
     * 增加 in 查询
     * @param col 字段
     * @param val 查询数组
     */
    in(col, val) {
        return this.addCdt(new Cdt_1.default(col, val, 'in'));
    }
    /**
     * 增加 in 查询
     * @param col 字段
     * @param val 查询数组
     */
    notIn(col, val) {
        if (val == null || val.length == 0) {
            return this;
        }
        return this.addCdt(new Cdt_1.default(col, val, 'not in'));
    }
    /**
     * 增加 like 查询
     * @param col 字段
     * @param val 查询值
     */
    like(col, val) {
        return this.addCdt(new Cdt_1.default(col, val, 'like'));
    }
    /**
     * 增加 大于 查询
     * @param col 字段
     * @param val 查询值
     */
    big(col, val) {
        return this.addCdt(new Cdt_1.default(col, val, '>'));
    }
    /**
     * 增加 大于等于 查询
     * @param col 字段
     * @param val 查询值
     */
    bigEq(col, val) {
        return this.addCdt(new Cdt_1.default(col, val, '>='));
    }
    /**
     * 增加 小于 查询
     * @param col 字段
     * @param val 查询值
     */
    less(col, val) {
        return this.addCdt(new Cdt_1.default(col, val, '<'));
    }
    /**
     * 增加 小于等于 查询
     * @param col 字段
     * @param val 查询值
     */
    lessEq(col, val) {
        return this.addCdt(new Cdt_1.default(col, val, '<='));
    }
    /**
     * 增加 不等于 查询
     * @param col 字段
     * @param val 查询值
     */
    notEq(col, val) {
        return this.addCdt(new Cdt_1.default(col, val, '!='));
    }
    /**
     * 增加 为空 查询
     * @param col 字段
     */
    isNull(col) {
        this.addCdt(new IsNullCdt_1.default(col));
        return this;
    }
    /**
     * 增加 不为空 查询
     * @param col 字段
     */
    isNotNull(col) {
        this.addCdt(new IsNotNullCdt_1.default(col));
        return this;
    }
    toSqlStr(str) {
        let sql = new Sql_1.default('(');
        var array = this._array;
        if (array.length == 0)
            return null;
        for (var i = 0; i < array.length; i++) {
            var cdt = array[i];
            if (i > 0) {
                sql.add(' ')
                    .add(str)
                    .add(' ');
            }
            sql.add(cdt.toSql());
        }
        sql.add(')');
        return sql;
    }
}
exports.default = ArrayCdt;
