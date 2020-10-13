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
const Hat_1 = __importDefault(require("./Hat"));
/**
 * 直接从searcher查询的一个hat
 * 构造函数 {
 *  key:'store' ,//指定searcher
 *  needOne:true|false //是否只查询一条记录
 *  funName:string // 查询的方法名
 *  dataCol:string //主表查询的字段，
 * }
 */
class SearcherHat extends Hat_1.default {
    _parseListToParam(list) {
        var array = [];
        for (var data of list) {
            array.push(this._parseData(data));
        }
        return array;
    }
    _parseData(data) {
        var opt = this._opt;
        if (opt.dataCol) {
            return data[opt.dataCol];
        }
        return data;
    }
    _schMap(list) {
        return __awaiter(this, void 0, void 0, function* () {
            if (list.length == 0)
                return {};
            var opt = this._opt;
            var searcher = this.getSearcher();
            var funName = opt.funName;
            var params = this._parseListToParam(list);
            //导入searcher缓存
            let retList = yield searcher.get(funName).find(params);
            yield this._afterSearch(params, retList);
            return {};
        });
    }
    _acqHatData(data, map) {
        return __awaiter(this, void 0, void 0, function* () {
            var opt = this._opt;
            var funName = opt.funName;
            var searcher = this.getSearcher();
            var list = yield searcher.get(funName).find(this._parseData(data));
            var opt = this._opt;
            if (opt.needOne) {
                return list[0];
            }
            return list;
        });
    }
    _afterSearch(params, retList) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    _processData(data, hatData) {
        var opt = this._opt;
        if (opt.needOne) {
            data._data = hatData;
        }
        else {
            data._array = hatData;
        }
    }
}
exports.default = SearcherHat;
