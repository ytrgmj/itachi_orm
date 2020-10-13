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
const BaseInquiry_1 = __importDefault(require("../BaseInquiry"));
/**
 * 单条件查询
 */
class Inquiry extends BaseInquiry_1.default {
    _findFromDb(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var query = new Query_1.default();
            query = yield this.processQuery(query, params);
            var list = yield this.getDao().find(query);
            return list;
        });
    }
    acqDataCode(data) {
        if (this._checkOtherCdt(data))
            return data[this.acqCol()].toString().toLowerCase();
        return null;
    }
    acqCode(param) {
        return param.toString().toLowerCase();
    }
    acqCol() {
        var opt = this._opt;
        return opt.col;
    }
    processQuery(query, params) {
        return __awaiter(this, void 0, void 0, function* () {
            query.addCdt(yield this._buildCdt(params));
            let schCols = this.acqSchCols();
            query.col(schCols);
            return query;
        });
    }
    /**
     * 构建查询条件
     * @param params
     */
    _buildCdt(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var cdt = new Cdt_1.default(this.acqCol(), params);
            return yield this._addOtherCdt(cdt);
        });
    }
    _addOtherCdt(optCdt) {
        return __awaiter(this, void 0, void 0, function* () {
            var otherCdt = this.acqOtherCdt();
            if (otherCdt == null) {
                return optCdt;
            }
            else {
                var andCdt = new AndCdt_1.default();
                andCdt.addCdt(optCdt);
                if (otherCdt instanceof Array) {
                    for (var cdt of otherCdt) {
                        andCdt.addCdt(cdt);
                    }
                }
                else {
                    if (otherCdt['clazz'] == 'BaseCdt') {
                        andCdt.addCdt(otherCdt);
                    }
                    else {
                        for (var e in otherCdt) {
                            andCdt.eq(e, otherCdt[e]);
                        }
                    }
                }
                return andCdt;
            }
        });
    }
}
exports.default = Inquiry;
const Query_1 = __importDefault(require("../../../dao/query/Query"));
const Cdt_1 = __importDefault(require("../../../dao/query/cdt/imp/Cdt"));
const AndCdt_1 = __importDefault(require("../../../dao/query/cdt/imp/AndCdt"));
