"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ArrayCdt_1 = __importDefault(require("../ArrayCdt"));
const itachi_util_1 = require("@dt/itachi_util");
class AndCdt extends ArrayCdt_1.default {
    toSql() {
        return this.toSqlStr('and');
    }
    toEs() {
        let q = {};
        for (let cdt of this._array) {
            itachi_util_1.JsonUtil.add(q, ['bool', 'must'], cdt.toEs());
        }
        return q;
    }
    isHit(obj) {
        var ret = true;
        for (var cdt of this._array) {
            if (!cdt.isHit(obj)) {
                ret = false;
                break;
            }
        }
        return ret;
    }
}
exports.default = AndCdt;
