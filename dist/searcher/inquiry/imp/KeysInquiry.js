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
const itachi_core_1 = require("itachi_core");
class KeysInquiry extends Inquiry_1.default {
    acqColKeys() {
        return this.get('keys');
    }
    _acqCodeByKeys(params) {
        var keys = this.acqColKeys();
        var code;
        var keyFun = this.get('keyFun');
        if (keyFun != null) {
            code = keyFun(params);
        }
        else {
            let opt = this._opt;
            if (keys != null) {
                var array = [];
                for (var i = 0; i < keys.length; i++) {
                    let val = params[keys[i]];
                    if (val == null) {
                        throw new Error(keys[i] + '不存在!!' + JSON.stringify(params) + '的');
                    }
                    if (val instanceof Date) {
                        if (opt.onlyDate) {
                            val = itachi_core_1.DateUtil.format(val);
                        }
                        else {
                            val = itachi_core_1.DateUtil.formatDate(val);
                        }
                    }
                    array.push(val);
                }
                code = array.join('___');
            }
        }
        return code.toLowerCase();
    }
    acqCode(params) {
        var ret = this._acqCodeByKeys(params);
        return ret;
    }
    acqDataCode(data) {
        if (!this._checkOtherCdt(data)) {
            return null;
        }
        return this._acqCodeByKeys(data);
    }
    _buildCdt(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var ret = yield this._buildArrayCdt(params);
            return yield this._addOtherCdt(ret);
        });
    }
    _buildArrayCdt(params) {
        return this._buildKeyCdt(params, 0);
    }
    _buildKeyCdt(array, index) {
        var keys = this.acqColKeys();
        var key = keys[index];
        if (index == keys.length - 1) {
            return new Cdt_1.default(key, itachi_core_1.ArrayUtil.toArrayDis(array, key));
        }
        else {
            var orCdt = new OrCdt_1.default();
            var map = itachi_core_1.ArrayUtil.toMapArray(array, key);
            for (var e in map) {
                var andCdt = new AndCdt_1.default();
                andCdt.eq(key, e);
                andCdt.addCdt(this._buildKeyCdt(map[e], index + 1));
                orCdt.addCdt(andCdt);
            }
            return orCdt;
        }
    }
}
exports.default = KeysInquiry;
const Cdt_1 = __importDefault(require("../../../dao/query/cdt/imp/Cdt"));
const AndCdt_1 = __importDefault(require("../../../dao/query/cdt/imp/AndCdt"));
const OrCdt_1 = __importDefault(require("../../../dao/query/cdt/imp/OrCdt"));
