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
const Inquiry_1 = __importDefault(require("./Inquiry"));
const orm_1 = require("../../../orm");
const itachi_core_1 = require("itachi_core");
class ProxyInquiry extends Inquiry_1.default {
    couldSaveAll() {
        return false;
    }
    _couldSave() {
        return false;
    }
    find(param) {
        return __awaiter(this, void 0, void 0, function* () {
            if (param == null)
                return [];
            if (!(param instanceof Array)) {
                param = [param];
            }
            if (param.length == 0)
                return [];
            var context = this.getContext();
            var list;
            var opt = this._opt;
            var searcher = context.get(this.getKey() + 'searcher');
            if (opt.funName) {
                var opt = this._opt;
                list = yield searcher[opt.funName](param);
            }
            else {
                list = yield searcher.findByIds(param);
            }
            return yield this._filter(list);
        });
    }
    _filter(list) {
        return __awaiter(this, void 0, void 0, function* () {
            var opt = this._opt;
            if (opt.fun) {
                return itachi_core_1.ArrayUtil.filter(list, opt.fun);
            }
            if (opt.otherCdt) {
                let array = [];
                var otherCdt = this.acqOtherCdt();
                var query = orm_1.Query.parse(otherCdt);
                for (let row of list) {
                    if (query.isHit(row)) {
                        array.push(row);
                    }
                }
                return array;
            }
            return list;
        });
    }
}
exports.default = ProxyInquiry;
