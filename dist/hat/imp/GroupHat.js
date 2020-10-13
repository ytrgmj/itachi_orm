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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itachi_core_1 = require("@dt/itachi_core");
const Hat_1 = __importDefault(require("./Hat"));
const orm_1 = require("../../orm");
/**
 * _acqGroup //group 字段
 * acqCol //返回的查询字段
 * async _acqOtherCdt // 返回的其他字段
 * 通过group查询的帽子
 */
class GroupHat extends Hat_1.default {
    _schMap(list) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = this._opt;
            let dao = this.getDao();
            let query = yield this._buildQuery(list);
            let array = yield dao.find(query);
            return this._toMap(array);
        });
    }
    _toMap(array) {
        if (array.length == 0)
            return {};
        return itachi_core_1.ArrayUtil.toMapByKey(array, this.acqDataCol());
    }
    _processData(data, hatData) {
        return __awaiter(this, void 0, void 0, function* () {
            data.cnt = hatData.cnt;
        });
    }
    /**
     * 返回列
     */
    acqCol() {
        return [this.acqDataCol(), 'count(*) as cnt'];
    }
    /**
     * 返回group字段
     */
    _acqGroup() {
        return [this.acqDataCol()];
    }
    _buildQuery(list) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = new orm_1.Query();
            query.in(this.acqDataCol(), this._acqIdsFromList(list));
            query.addCdt(yield this._acqOtherCdt(list));
            query.col(this.acqCol());
            query.group(this._acqGroup());
            return query;
        });
    }
    _acqOtherCdt(list) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = this._opt;
            if (opt.otherCdt) {
                return opt.otherCdt;
            }
        });
    }
    _acqDefData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                [this.acqDataCol()]: data[this.acqDataCol()],
                cnt: 0
            };
        });
    }
}
exports.default = GroupHat;
