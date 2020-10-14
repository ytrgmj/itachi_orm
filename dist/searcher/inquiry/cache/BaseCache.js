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
Object.defineProperty(exports, "__esModule", { value: true });
class BaseCache {
    constructor(baseInquiry) {
        this._inquiry = baseInquiry;
    }
    removeCache(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params == null)
                return;
            if (!(params instanceof Array))
                params = [params];
            if (params.length == 0)
                return;
            var keys = this._parseKeyArray(params);
            keys = itachi_util_1.ArrayUtil.distinct(keys);
            yield this._removeCache(keys);
        });
    }
    _parseKeyArray(params) {
        var inquiry = this._inquiry;
        return itachi_util_1.ArrayUtil.parse(params, (param) => {
            return inquiry.acqDataCode(param);
        });
    }
    setKey(key) {
        this._key = key;
    }
    saveArray(opts, dbs) {
        return __awaiter(this, void 0, void 0, function* () {
            var inquiry = this._inquiry;
            var map = itachi_util_1.ArrayUtil.toMapArray(dbs, data => inquiry.acqDataCode(data));
            for (var opt of opts) {
                var key = inquiry.acqCode(opt);
                var val = map[key];
                if (val == null)
                    val = [];
                yield this.save(key, val);
            }
        });
    }
    onlySaveArray(dbs) {
        return __awaiter(this, void 0, void 0, function* () {
            var inquiry = this._inquiry;
            var map = itachi_util_1.ArrayUtil.toMapArray(dbs, data => inquiry.acqDataCode(data));
            for (var key in map) {
                var val = map[key];
                yield this.save(key, val);
            }
        });
    }
    /**
    返回结果
    {
      ret, //从缓存中查出的结果
      list //从缓存中找不到的key值
    }
    */
    find(optArray) {
        return __awaiter(this, void 0, void 0, function* () {
            var array = yield this.keyArray();
            var hasArray = itachi_util_1.ArrayUtil.and(optArray, array);
            var ret = yield this._find(hasArray);
            var notArray = itachi_util_1.ArrayUtil.notIn(optArray, array);
            return {
                ret,
                list: notArray
            };
        });
    }
    _find(hasArray) {
        return __awaiter(this, void 0, void 0, function* () {
            var ret = [];
            for (var i = 0; i < hasArray.length; i++) {
                var key = hasArray[i];
                itachi_util_1.ArrayUtil.addAll(ret, yield this.get(key));
            }
            return ret;
        });
    }
    _acqKey() {
        return this._key;
    }
}
exports.default = BaseCache;
const itachi_util_1 = require("itachi_util");
