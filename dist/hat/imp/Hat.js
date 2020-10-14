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
const BaseHat_1 = __importDefault(require("../BaseHat"));
const itachi_core_1 = require("itachi_core");
/**
 * 跨表/接口 查询类
 * _filterList(list) //过滤条件
 * fun // 处理函数
 *
 *
 */
// dataXxxx 主表 hatXxx 从表字段
class Hat extends BaseHat_1.default {
    /**
     * 返回从数据中查询的字段名
     */
    acqHatCol(row) {
        var opt = this._opt;
        if (opt.hatCol) {
            return opt.hatCol;
        }
        if (row.name != null)
            return 'name';
        else
            return this.getKey() + '_name';
    }
    /**
     * 返回给主表的名称
     */
    acqDataName() {
        var opt = this._opt;
        if (opt.dataName) {
            return opt.dataName;
        }
        var key = this.getKey();
        return key + '_name';
    }
    /**
    返回读取data中的字段
    */
    acqDataCol() {
        var opt = this._opt;
        if (opt.dataCol != null) {
            return opt.dataCol;
        }
        var key = this.getKey();
        key = key + '_id';
        return key;
    }
    _acqMapKey(data) {
        return data[this.acqDataCol()];
    }
    getKey() {
        return this._opt.key;
    }
    getDao(key) {
        if (key == null) {
            key = this.getKey();
        }
        return this.getContext().get(key + 'Dao');
    }
    getSearcher(key) {
        if (key == null) {
            key = this.getKey();
        }
        return this.getContext().get(key + 'searcher');
    }
    process(list) {
        return __awaiter(this, void 0, void 0, function* () {
            var map = yield this._schMap(list);
            var ret = [];
            for (var i = 0; i < list.length; i++) {
                var data = yield this._process(list[i], map);
                if (data != null) {
                    ret.push(data);
                }
            }
            return ret;
        });
    }
    _schMap(list) {
        return __awaiter(this, void 0, void 0, function* () {
            list = this._acqIdsFromList(list);
            if (list.length == 0)
                return {};
            var array = yield this._findByIds(list);
            let map = this._toMap(array);
            return map;
        });
    }
    _acqIdsFromList(list) {
        var key = this.acqDataCol();
        var funName = '_filterList';
        if (this[funName]) {
            list = this[funName](list);
        }
        list = itachi_core_1.ArrayUtil.toArray(list, key);
        list = itachi_core_1.ArrayUtil.distinct(list);
        return list;
    }
    /**
     * 将查询结果转成map ，方便取值
     * @param array
     */
    _toMap(array) {
        if (array.length == 0)
            return {};
        var row = array[0];
        if (row.id == null) {
            //数据没有id
            return itachi_core_1.ArrayUtil.toMapByKey(array, this.getKey() + '_id');
        }
        else {
            return itachi_core_1.ArrayUtil.toMapByKey(array, 'id');
        }
    }
    /**
     * 根据主键从 关联表取数据
     * @param list
     */
    _findByIds(list) {
        return __awaiter(this, void 0, void 0, function* () {
            var searcher = this.getSearcher();
            var array = yield searcher.findByIds(list);
            return array;
        });
    }
    /**
     * 从map里面查询关联数据
     * @param data
     * @param map
     */
    _acqHatData(data, map) {
        return __awaiter(this, void 0, void 0, function* () {
            var mapKey = yield this._acqMapKey(data);
            if (mapKey == null) {
                return null;
            }
            var hatData = map[mapKey];
            return hatData;
        });
    }
    _acqDefData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return null;
        });
    }
    _process(data, map) {
        return __awaiter(this, void 0, void 0, function* () {
            var hatData = yield this._acqHatData(data, map);
            if (hatData == null) {
                hatData = yield this._acqDefData(data);
            }
            if (hatData != null) {
                if (this._fun) {
                    yield this._fun(data, hatData);
                }
                else {
                    yield this._processData(data, hatData);
                }
            }
            return data;
        });
    }
    _processData(data, hatData) {
        var key = this.getKey();
        data[this.acqDataName()] = hatData[this.acqHatCol(hatData)];
    }
}
exports.default = Hat;
