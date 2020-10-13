"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SqlBuilder_1 = __importDefault(require("../SqlBuilder"));
const Sql_1 = __importDefault(require("../../../sql/Sql"));
const Query_1 = __importDefault(require("../../../query/Query"));
class BaseFind extends SqlBuilder_1.default {
    /**
     * 构建where 后面的
     */
    _buildWhere(query) {
        var sql = new Sql_1.default();
        var cdts = query.getCdts();
        if (cdts == null || cdts.length == 0)
            return sql;
        if (cdts) {
            this._pushSqlTxt(sql, 'where');
        }
        var count = 0;
        for (var i = 0; i < cdts.length; i++) {
            if (cdts[i]) {
                if (count > 0) {
                    this._pushSqlTxt(sql, ' and ');
                }
                sql.add(cdts[i].toSql());
                count++;
            }
        }
        return sql;
    }
    _buildJoinTable(query) {
        var list = query.getJoinTables();
        if (list.length == 0)
            return null;
        let sql = new Sql_1.default();
        var opt = this._opt;
        for (let joinTable of list) {
            sql.add(joinTable.toSql(opt.getTableName()));
        }
        return sql;
    }
    _buildGroup(query) {
        let groups = query.getGroups();
        if (groups == null || groups.length == 0)
            return null;
        let sql = new Sql_1.default(' group by ');
        for (var i = 0; i < groups.length; i++) {
            if (i > 0)
                sql.add(',');
            sql.add(groups[i]);
        }
        return sql;
    }
    _buildHaving(query) {
        var cdts = query.getHaving();
        if (cdts == null || cdts.length == 0)
            return null;
        let sql = new Sql_1.default(' having ');
        for (var i = 0; i < cdts.length; i++) {
            if (i > 0) {
                sql.add(' and ');
            }
            sql.add(cdts[i].toSql());
        }
        return sql;
    }
    _buildOrder(query) {
        let orders = query.getOrders();
        if (orders == null || orders.length == 0)
            return null;
        let sql = new Sql_1.default();
        sql.add('order by');
        for (let i = 0; i < orders.length; i++) {
            if (i > 0)
                sql.add(',');
            sql.add(orders[i].toSql());
        }
        return sql;
    }
    /**
     * 产生分页的sql
     * @param sql
     * @param query
     */
    _buildPage(sql, query) {
        let pager = query.getPager();
        if (pager == null)
            return sql;
        if (!pager.rp)
            return sql;
        var array = [];
        var first = pager.first;
        if (first == null || isNaN(first))
            first = 0;
        sql.add(`LIMIT ${parseInt(pager.rp)} OFFSET ${parseInt(first)}`);
        // sql.add( 'LIMIT  ' + parseInt(first) + ' , ' + parseInt(pager.rp))
        return sql;
    }
    build(query, opts) {
        query = Query_1.default.parse(query);
        let sql = new Sql_1.default();
        sql.add(this._buildFind(query));
        if (query) {
            sql.add(this._buildJoinTable(query));
            sql.add(this._buildWhere(query));
            sql.add(this._buildGroup(query));
            sql.add(this._buildHaving(query));
            sql.add(this._buildOrder(query));
            sql = this._buildPage(sql, query);
            if (query.isForUpdate()) {
                sql.add('for update');
            }
        }
        return sql;
    }
}
exports.default = BaseFind;
