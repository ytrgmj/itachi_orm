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
const Hat_1 = __importDefault(require("./base/Hat"));
class NoHat extends Hat_1.default {
    acqDataCol() {
        var opt = this._opt;
        if (opt.dataCol != null) {
            return opt.dataCol;
        }
        var key = this.getKey();
        key = key + '_no';
        return key;
    }
    _toMap(array) {
        if (array.length == 0)
            return {};
        return itachi_core_1.ArrayUtil.toMapByKey(array, this.getKey() + '_no');
    }
    _findByIds(list) {
        return __awaiter(this, void 0, void 0, function* () {
            var searcher = this.getSearcher();
            var array = yield searcher.findByNos(list);
            return array;
        });
    }
}
exports.default = NoHat;
