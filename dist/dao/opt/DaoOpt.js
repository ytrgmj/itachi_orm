"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DaoOpt {
    constructor(opt) {
        if (opt == null)
            opt = {};
        this._opt = opt;
    }
    /**
     * 返回表名
     */
    getTableName() {
        return this._opt.tableName;
    }
    /**
     * @returns poolName
     */
    getPoolName() {
        return this._opt.poolName;
    }
    /**
     * 返回id列表
     */
    acqIds() {
        var opt = this._opt;
        if (opt.ids == null)
            return ['id'];
        var ids = opt.ids;
        if (!(ids instanceof Array))
            ids = [ids];
        return ids;
    }
    /**
     * 是否 id
     * @param col
     */
    isId(col) {
        var ids = this.acqIds();
        for (var id of ids) {
            if (col == id)
                return true;
        }
        return false;
    }
    /**
     * 是否自增
     */
    isIncrement() {
        var opt = this._opt;
        return opt.increment == null || opt.increment == true;
    }
    /**
     * 返回首个id
     */
    acqFirstId() {
        var ids = this.acqIds();
        return ids[0];
    }
}
exports.default = DaoOpt;
