"use strict";
/**
 * 查询条件的封装
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
class Query {
    constructor(opts) {
        this.clazz = 'Query';
        this._colArray = [];
        this._cols = null;
        this._groupArray = null;
        this._havingColArray = [];
        this._havingCol = null;
        this._groupColArray = [];
        this._joinTables = [];
        this._cdtArray = [];
        this._orders = [];
        this._pager = {};
        this._noResult = false;
        this._forUpdate = false;
        if (opts == null)
            return;
        if (opts instanceof Array) {
            this.ctor_array(opts);
        }
        else {
            this.ctor_map(opts);
        }
    }
    isHit(row) {
        if (row == null) {
            return false;
        }
        var cdts = this.getCdts();
        if (cdts == null)
            return true;
        for (var cdt of cdts) {
            if (cdt.isHit != null && !cdt.isHit(row)) {
                return false;
            }
        }
        return true;
    }
    hitList(list) {
        return itachi_core_1.ArrayUtil.filter(list, (row) => this.isHit(row));
    }
    /**
     * 查询 肯定没结果
     * in一个空数组
     */
    isNoResult() {
        return this._noResult;
    }
    acqCol() {
        if (this._cols == null) {
            var cols = this._colArray;
            if (cols != null) {
                var retCol = [];
                for (var col of cols) {
                    retCol.push(new Col_1.default(col));
                }
                this._cols = retCol;
            }
            else {
                this._cols = [];
            }
        }
        return this._cols;
    }
    col(val) {
        if (val != null) {
            if (val instanceof Array) {
                this._colArray.push(...val);
            }
            else {
                val = val.toString();
                this._colArray.push(...val.split(','));
            }
        }
        return this;
    }
    getCol() {
        return this._colArray;
    }
    /**
     * 表示该query的col具有聚合列
     */
    colhasAgg() {
        var cols = this.acqCol();
        if (cols.length == 0) {
            return false;
        }
        for (var col of cols) {
            if (col.hasAgg()) {
                return true;
            }
        }
        return false;
    }
    acqGroupCol() {
        if (this._groupArray == null) {
            var groups = this._groupColArray;
            //groups = ArrayUtil.parse(groups, (data) => new Col(data))
            this._groupArray = [];
            for (var col of this._groupColArray) {
                this._groupArray.push(new Col_1.default(col));
            }
        }
        return this._groupArray;
    }
    acqHavingCols() {
        if (this._havingCol == null) {
            var cols = this._havingColArray;
            if (cols != null) {
                /*
                cols = ArrayUtil.parse(cols, (data) => {
                    var sql = data.toSql()
                    if (sql.sql) {
                        sql = sql.sql
                    }

                    var col = new Col()
                    col.parseHavingCol(sql)
                    return col
                })*/
                this._havingCol = [];
                for (var cdt of cols) {
                    var col = new Col_1.default();
                    col.parseHavingCol(cdt);
                    this._havingCol.push(col);
                }
            }
            else {
                this._havingCol = [];
            }
        }
        return this._havingCol;
    }
    getGroups() {
        return this._groupColArray;
    }
    group(val) {
        this._groupColArray = [];
        if (val instanceof Array) {
            this._groupColArray.push(...val);
        }
        else {
            this._groupColArray.push(...val.split(','));
        }
        return this;
    }
    addGroup(group) {
        this._groupColArray.push(group);
        return this;
    }
    /**
    返回jointable
    */
    getJoinTables() {
        return this._joinTables;
    }
    /**
     * 关联jointable
     * @param table 表名或者 一个JoinTable 对象
     * @param col  主表字段 默认 table_id
     * @param id  次表主键 默认“id”
     */
    joinTable(table, col, id) {
        if (table instanceof JoinTable_1.default) {
            this._joinTables.push(table);
        }
        else {
            this._joinTables.push(new JoinTable_1.default(table, col, id));
        }
        return this;
    }
    /**
    返回查询条件
    */
    getCdts() {
        return this._cdtArray;
    }
    /**
    返回查询条件
    */
    getOrders() {
        return this._orders;
    }
    order(col, desc) {
        this._orders = [];
        if (col == null)
            return this;
        return this.addOrder(col, desc);
    }
    /**
     * 倒排一列
     * @param col
     */
    desc(col) {
        return this.order(col, 'desc');
    }
    addOrder(col, desc) {
        if (col instanceof Array) {
            this._orders.push(...col);
        }
        else {
            if (col instanceof OrderItem_1.default) {
                this._orders.push(col);
            }
            else {
                if (col.col) {
                    this._orders.push(new OrderItem_1.default(col.col, col.desc));
                }
                else {
                    this._orders.push(new OrderItem_1.default(col, desc));
                }
            }
        }
        return this;
    }
    /**
    返回分页
    */
    getPager() {
        return this._pager;
    }
    /**
    设置长度
    */
    size(val) {
        this._pager.rp = val;
        return this;
    }
    /**
    设置初始页
    */
    first(first) {
        this._pager.first = first;
        return this;
    }
    /**
    设置页长 和 第几页
    */
    setPage(pageth, len) {
        if (pageth == null)
            return this;
        if (len == null) {
            len = this._pager.rp;
        }
        if (len == null)
            throw new Error('请先设置页长');
        return this.first((pageth - 1) * len)
            .size(len);
    }
    addHaving(cdt) {
        if (cdt == null)
            return this;
        this._havingColArray.push(cdt);
        return this;
    }
    getHaving() {
        return this._havingColArray;
    }
    /**
     * 增加查询条件
     * @param cdt 查询条件|数组
     */
    addCdt(cdt) {
        if (cdt == null)
            return this;
        if (cdt instanceof Array) {
            this._cdtArray.push(...cdt);
        }
        else {
            this._cdtArray.push(cdt);
        }
        return this;
    }
    ctor_map(map) {
        for (var e in map) {
            if (e.substring(0, 1) != '_' && map[e] != null) {
                this.addCdt(new Cdt_1.default(e, map[e]));
            }
        }
    }
    ctor_array(array) {
        this._cdtArray.push(...array);
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
    /**
     * 增加 不等于 查询
     * @param col 字段
     * @param val 查询值
     */
    orCdt() {
        var cdt = new OrCdt_1.default();
        this.addCdt(cdt);
        return cdt;
    }
    andCdt() {
        var cdt = new AndCdt_1.default();
        this.addCdt(cdt);
        return cdt;
    }
    /**
     * 查询出来for updat
     */
    forUpdate() {
        this._forUpdate = true;
        return this;
    }
    /**
     * 是否查询出来for update
     */
    isForUpdate() {
        return this._forUpdate;
    }
    /**
    创建一个查询条件相同的query，
    */
    cloneSameCdt() {
        var query = new Query(this.getCdts());
        return query;
    }
    static parse(query) {
        if (query == null)
            return new Query();
        if (query.clazz == 'BaseCdt') {
            var ret = new Query();
            ret.addCdt(query);
            return ret;
        }
        if (query.clazz == 'Query')
            return query;
        return new Query(query);
    }
}
exports.default = Query;
;
const Cdt_1 = __importDefault(require("./cdt/imp/Cdt"));
const JoinTable_1 = __importDefault(require("./JoinTable"));
const OrderItem_1 = __importDefault(require("./OrderItem"));
const AndCdt_1 = __importDefault(require("./cdt/imp/AndCdt"));
const OrCdt_1 = __importDefault(require("./cdt/imp/OrCdt"));
const IsNullCdt_1 = __importDefault(require("./cdt/imp/IsNullCdt"));
const IsNotNullCdt_1 = __importDefault(require("./cdt/imp/IsNotNullCdt"));
const Col_1 = __importDefault(require("../col/Col"));
const itachi_core_1 = require("@dt/itachi_core");
