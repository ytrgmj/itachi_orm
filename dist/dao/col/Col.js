"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
代表查询中的一个列
各种形式:
    t.xx as yy,
    xx,
    xx+yy as zz,
    sum(xx) as yy,
    distinct yy
*/
const itachi_core_1 = require("itachi_core");
var havingOpers = [
    '>=',
    '<=',
    '>',
    '<',
    '='
];
class Col {
    constructor(str) {
        if (str) {
            this.parse(str);
        }
    }
    parse(str) {
        str = str.split(' as ');
        if (str.length == 1) {
            str = str[0].split(' AS ');
        }
        var colname = this._parseColName(str[0]);
        this._colName = colname;
        this._name = (str[1] == null ? colname : str[1]);
    }
    /**
    为havingcol
    */
    parseHavingCol(cdt) {
        let col = this._parseColName(cdt.getCol());
        this._colName = [col, cdt.getOp(), cdt.getVal()].join(' ');
    }
    /*
    _parseHavingCol(str, oper) {
        str = str.split(oper)
        if (str.length == 1) return false
        var col = this._parseColName(str[0])
        this._colName = [col, oper, str[1]].join(' ')
        return true
    }*/
    _parseColName(name) {
        name = itachi_core_1.StrUtil.trim(name);
        if (name.substring(0, 2) == 't.') {
            name = name.substring(2);
        }
        if (this._startWithCount(name)) {
            name = this._parseCount(name);
        }
        return name;
    }
    _startWithCount(name) {
        return itachi_core_1.StrUtil.startIngoreCase(name, 'count ') ||
            itachi_core_1.StrUtil.startIngoreCase(name, 'count(');
    }
    _parseCount(name) {
        name = name.split('(');
        name = name[1];
        name = name.split(')');
        name = name[0];
        name = itachi_core_1.StrUtil.trim(name);
        if (name == '' || name == '*') {
            return 'count()';
        }
        if (itachi_core_1.StrUtil.startIngoreCase(name, 'distinct ')) {
            name = name.substring('distinct '.length);
            return `cardinality(${name})`;
        }
        else {
            return `value_count(${name})`;
        }
    }
    getName() {
        return this._name;
    }
    getColName() {
        return this._colName;
    }
    /**
    读取es的查询结果集合
    */
    parseEsHitResult(data, row) {
        var formula = this.acqFormula();
        data[this.getName()] = formula.toVal(row);
    }
    /**
    读取ess 的 agg result
    */
    parseEsAggResult(data, row) {
        var formula = this.acqFormula();
        data[this.getName()] = formula.toEsVal(row, null);
    }
    acqFormula() {
        if (this._formula == null) {
            var parser = new itachi_core_1.FormulaParser();
            var formula = parser.parse(this.getColName());
            this._formula = formula;
        }
        return this._formula;
    }
    acqFormulaString() {
        var formula = this.acqFormula();
        if (formula == null) {
            return '';
        }
        return formula.toString();
    }
    toString() {
        return `${this.getColName()}:${this.getName()}`;
    }
    hasAgg() {
        var formula = this.acqFormula();
        return formula.hasAgg();
    }
    /**
    设置查询es的时候的egg
    */
    parseEsAgg(param) {
        if (param == null) {
            return null;
        }
        var formula = this.acqFormula();
        formula.parseEsAgg(param);
    }
    parseEsGroupParam(param) {
        var formula = this.acqFormula();
        var ret = this.toEsGroupParam();
        itachi_core_1.JsonUtil.set(param, ['aggs'], ret);
        return ret[formula.toString()];
    }
    toEsGroupParam() {
        var formula = this.acqFormula();
        var terms = {
            size: 0
        };
        var param = {
            [formula.toString()]: {
                terms: terms
            }
        };
        formula.parseEsGroupParam(terms);
        return param;
    }
    /**
    设置es 的group查询的select 后面的col

    */
    parseEsGroupSchCol(param) {
        var formula = this.acqFormula();
        if (formula instanceof itachi_core_1.Formula) {
            this.parseEsAgg(param);
        }
    }
    parseEsHaving(param) {
        var formula = this.acqFormula();
        return formula.parseEsHaving(param);
    }
}
exports.default = Col;
