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
 * 多表查询
 */
class TablesInquiry extends BaseInquiry_1.default {
    constructor(opt) {
        super(opt);
    }
    _findFromDb(params) {
        throw new Error("不需要实现");
    }
    acqDataCode(data) {
        throw new Error("不需要实现");
    }
    acqCode(param) {
        throw new Error("不需要实现");
    }
    _getName() {
        var opt = this._opt;
        return opt.name;
    }
    getSearcher(key) {
        var context = this.getContext();
        return context.get(key + 'searcher');
    }
    _findArray(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(params instanceof Array)) {
                params = [params];
            }
            var datas = yield this._findFromOtherSearcher(params);
            var list = yield this._find(datas, params);
            return yield this._addDefData(list, datas);
        });
    }
    _find(datas, opt) {
        var opt;
        return __awaiter(this, void 0, void 0, function* () {
            if (datas == null || datas.length == 0)
                return [];
            var context = this.getContext();
            var searcher = context.get(this.getKey() + 'searcher');
            opt = this._opt;
            var name = this._getName();
            if (name == null) {
                return yield searcher.findByIds(datas);
            }
            else {
                return yield searcher.get(name).find(datas);
            }
        });
    }
    _couldSave() {
        return false;
    }
}
exports.default = TablesInquiry;
