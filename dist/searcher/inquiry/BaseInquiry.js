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
const MapCache_1 = __importDefault(require("./cache/imp/MapCache"));
/**
 * 查询的父类
 * async _findDefDatas(params:Array<any>);//产生查询结果没有时候的默认值
 * async _parseResult(data) //更改查询数据
 */
class BaseInquiry {
    constructor(opt) {
        if (opt == null) {
            opt = {};
        }
        this._opt = opt;
    }
    get(key) {
        return this._opt[key];
    }
    acqSchCols() {
        let opt = this._opt;
        return opt.schCols;
    }
    /**
     * 注册的时候设置查询列
     * @param cols
     */
    setSchColsOnReg(cols) {
        let opt = this._opt;
        if (opt.schCols == null) {
            opt.schCols = cols;
        }
    }
    _acqCache() {
        if (this._cache == null) {
            this._cache = new MapCache_1.default(this);
        }
        return this._cache;
    }
    couldSaveAll() {
        return true;
    }
    _checkOtherCdt(data) {
        var otherCdt = this.acqOtherCdt();
        var query = Query_1.default.parse(otherCdt);
        return otherCdt == null
            || query.isHit(data);
    }
    /**
     * 清空缓存
     */
    clearCache() {
        var cache = this._acqCache();
        cache.clearCache();
    }
    /**
     * 返回缓存中数组
     */
    keyArray() {
        return __awaiter(this, void 0, void 0, function* () {
            var cache = this._acqCache();
            return cache.keyArray();
        });
    }
    /**
     * 查询数据
     * @param params:Array|any 查询条件，支持数组或单个
     * @param col:可空。null的话返回整条数据，不为null则返回一个只有该字段的数组
     */
    find(params, col) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params == null) {
                return [];
            }
            if (params instanceof Array && params.length == 0) {
                return [];
            }
            if (!(params instanceof Array))
                params = [params];
            params = yield this._parseOpt(params);
            var retList = yield this._findArray(params);
            retList = yield this._addDefData(retList, params);
            retList = yield this.parseRsult(retList);
            if (col != null) {
                retList = itachi_core_1.ArrayUtil.toArray(retList, col);
            }
            return retList;
        });
    }
    _addDefData(list, opt) {
        return __awaiter(this, void 0, void 0, function* () {
            var funKey = '_findDefDatas';
            if (this[funKey]) {
                if (!(opt instanceof Array)) {
                    opt = [opt];
                }
                let notOpt = this._findNotOpt(list, opt);
                if (notOpt.length > 0) {
                    var array = yield this[funKey](notOpt, list);
                    itachi_core_1.ArrayUtil.addAll(list, array);
                }
            }
            let opts = this._opt;
            if (opts.findDefDatas) {
                if (!(opt instanceof Array)) {
                    opt = [opt];
                }
                let notOpt = this._findNotOpt(list, opt);
                if (notOpt.length > 0) {
                    var array = yield opts.findDefDatas(notOpt, list);
                    itachi_core_1.ArrayUtil.addAll(list, array);
                }
            }
            return list;
        });
    }
    _findNotOpt(list, opt) {
        var array = itachi_core_1.ArrayUtil.notInByKey(opt, list, (data) => this.acqCode(data), (data) => this.acqDataCode(data));
        return array;
    }
    parseRsult(list) {
        return __awaiter(this, void 0, void 0, function* () {
            var funKey = '_parseResult';
            if (this[funKey]) {
                var array = [];
                for (var data of list) {
                    array.push(yield this[funKey](data));
                }
                return array;
            }
            return list;
        });
    }
    /**
     * 返回其他条件
     */
    acqOtherCdt() {
        return this._opt['otherCdt'];
    }
    /**
     * 返回查询的表名
     */
    getKey() {
        return this._opt['key'];
    }
    acqKeys() {
        var cache = this._acqCache();
        return cache.acqKeys();
    }
    setKey(key) {
        this._opt['key'] = key;
        var cache = this._acqCache();
        cache.setKey(key);
    }
    getContext() {
        return this._opt.context;
    }
    setContext(context) {
        this._opt.context = context;
    }
    getDao() {
        let key = this.getKey();
        return this.getContext().get(key + 'dao');
    }
    /**
     * 能否传入一个数组直接保存
     * 如果需要关联表的则不行
     */
    _couldSave() {
        return true;
    }
    save(array) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._couldSave()) {
                return false;
            }
            var self = this;
            var map = itachi_core_1.ArrayUtil.toMapArray(array, function (data) {
                return self.acqDataCode(data);
            });
            for (var e in map) {
                yield this._save(e, map[e]);
            }
        });
    }
    _save(e, list) {
        return __awaiter(this, void 0, void 0, function* () {
            if (e != null) {
                var cache = this._acqCache();
                yield cache.save(e, list);
            }
        });
    }
    _hasFindArray() {
        return true;
    }
    _parseOpt(params) {
        return params;
    }
    _findArray(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var self = this;
            var cache = this._acqCache();
            var ret = [];
            var optArray = itachi_core_1.ArrayUtil.parse(params, function (data) {
                return self.acqCode(data);
            });
            var obj = yield cache.find(optArray);
            itachi_core_1.ArrayUtil.addAll(ret, obj.ret);
            var notArray = obj.list;
            if (notArray.length > 0) {
                var notMap = itachi_core_1.ArrayUtil.toMap(notArray);
                notArray = itachi_core_1.ArrayUtil.filter(params, function (data) {
                    return notMap[self.acqCode(data)];
                });
                var dbs = yield this._findFromDb(notArray);
                yield this.saveArray(notArray, dbs);
                itachi_core_1.ArrayUtil.addAll(ret, dbs);
            }
            return ret;
        });
    }
    saveArray(params, dbs) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._couldSave()) {
                return false;
            }
            var cache = this._acqCache();
            yield cache.saveArray(params, dbs);
        });
    }
    _getFromCacheByArray(array) {
        return __awaiter(this, void 0, void 0, function* () {
            var ret = [];
            var self = this;
            array = itachi_core_1.ArrayUtil.parse(array, function (data) {
                return self.acqCode(data);
            });
            //var map = this._map
            var cache = this._acqCache();
            for (var key of array) {
                itachi_core_1.ArrayUtil.addAll(ret, yield cache.get(key));
            }
            return ret;
        });
    }
    /**
     * 仅仅从缓存查找
     */
    acqFromCache(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var ret = yield this._getFromCacheByArray(params);
            return ret;
        });
    }
    removeCache(list) {
        return __awaiter(this, void 0, void 0, function* () {
            var cache = this._acqCache();
            yield cache.removeCache(list);
        });
    }
    one(params) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = yield this.find(params);
            return list[0];
        });
    }
}
exports.default = BaseInquiry;
const Query_1 = __importDefault(require("../../dao/query/Query"));
const itachi_core_1 = require("@dt/itachi_core");
