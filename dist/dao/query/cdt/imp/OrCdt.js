"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itachi_util_1 = require("@dt/itachi_util");
const ArrayCdt_1 = __importDefault(require("../ArrayCdt"));
class OrCdt extends ArrayCdt_1.default {
    toEs() {
        let q = {};
        for (let cdt of this._array) {
            itachi_util_1.JsonUtil.add(q, ['bool', 'should'], cdt.toEs());
        }
        return q;
    }
    toSql() {
        return this.toSqlStr('or');
    }
    isHit(obj) {
        var ret = false;
        for (var cdt of this._array) {
            if (cdt.isHit(obj)) {
                ret = true;
                break;
            }
        }
        return ret;
    }
}
exports.default = OrCdt;
