"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const itachi_core_1 = require("@dt/itachi_core");
const orm_1 = require("../orm");
/**
 * 用于同步数据，将level=brand 的数据同步到其他级别下
 */
class SyncData {
    constructor(opt) {
        this._opt = opt;
    }
    getLevel() {
        let level = this._opt.level;
        if (level == null)
            level = 'brand';
        return level;
    }
    noNeedSchLevel() {
        let noNeedSchLevel = this._opt.noNeedSchLevel;
        return noNeedSchLevel != null;
    }
    buildQuery(list) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = new orm_1.Query();
            let noCol = this.getNoCol();
            query.in(noCol, itachi_core_1.ArrayUtil.toArray(list, noCol));
            query.eq('is_del', 0);
            if (!this.noNeedSchLevel())
                query.notEq('level', this.getLevel());
            let otherCdt = this._opt.otherCdt;
            if (otherCdt) {
                query.addCdt(orm_1.BaseCdt.parse(otherCdt));
            }
            return query;
        });
    }
    _find(list) {
        return __awaiter(this, void 0, void 0, function* () {
            let dao = this.getDao();
            let query = yield this.buildQuery(list);
            return yield dao.find(query);
        });
    }
    syncData(list) {
        return __awaiter(this, void 0, void 0, function* () {
            if (list == null || list.length == 0)
                return;
            let array = yield this._find(list);
            if (array.length == 0)
                return;
            let dao = this.getDao();
            let self = this;
            let idCol = this.getIdCol();
            let datas = itachi_core_1.ArrayUtil.joinArray({
                key: this.getNoCol(),
                list,
                list2: array,
                fun(data, list2Array) {
                    let retArray = [];
                    let cols = self.getCols();
                    for (let row of list2Array) {
                        if (!self.isSame(row, data)) {
                            let updateData = {};
                            for (let col of cols) {
                                updateData[col] = data[col];
                            }
                            updateData[idCol] = row[idCol];
                            retArray.push(updateData);
                        }
                    }
                    return retArray;
                }
            });
            yield dao.updateArray(datas);
        });
    }
    getTableName() {
        return this._opt.tableName;
    }
    getDao() {
        let context = this._opt.context;
        return context.get(this.getTableName() + 'dao');
    }
    getNoCol() {
        return this.getTableName() + '_no';
    }
    getIdCol() {
        return this.getTableName() + '_id';
    }
    isSame(data, data1) {
        return itachi_core_1.BeanUtil.isEqual(data, data1, this.getCols());
    }
    getCols() {
        let opt = this._opt;
        let cols = opt.cols;
        if (cols == null)
            cols = ['sort', 'name', 'is_del'];
        return cols;
    }
}
exports.default = SyncData;
