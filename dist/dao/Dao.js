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
const Query_1 = __importDefault(require("./query/Query"));
const DaoOpt_1 = __importDefault(require("./opt/DaoOpt"));
const lodash_1 = __importDefault(require("lodash"));
const itachi_core_1 = require("itachi_core");
class Dao {
    constructor(opt) {
        this._opt = new DaoOpt_1.default(opt);
    }
    /**
     * 根据一个查询条件，进行更新
     * @param whereCdt 查询条件
     * @param data  //更新数据
     */
    updateByCdt(whereCdt, data) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkNullCdt(whereCdt);
            let idCol = this._opt.acqFirstId();
            let list = yield this.findCol(whereCdt, idCol);
            list = list.map(id => ({ [idCol]: id }));
            return yield this.updateArray(list, data, whereCdt);
        });
    }
    /**
     * 根据一个查询条件，进行删除
     * @param cdt
     * @param data
     */
    delByCdt(cdt) {
        return __awaiter(this, void 0, void 0, function* () {
            this._checkNullCdt(cdt);
            let idCol = this._opt.acqFirstId();
            let list = yield this.findCol(cdt, idCol);
            list = list.map(id => ({ [idCol]: id }));
            return yield this.delArray(list, cdt);
        });
    }
    _checkNullCdt(cdt) {
        if (cdt == null)
            if (cdt.clazz == 'BaseCdt') //BaseCdt 没办法检测条件
                return;
        let cnt = 0;
        for (var e in cdt) {
            if (cdt[e] == null) {
                throw new Error(`条件的${e}为空`);
            }
            cnt++;
        }
        if (cnt == 0)
            throw new Error('不能传空的条件');
    }
    getTableName() {
        return this._opt.getTableName();
    }
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    /**
     * 根据主键判断有或者没有
     * @param data
     */
    save(data, whereObj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (data == null)
                return;
            let id = data[this._opt.acqFirstId()];
            if (id == null) {
                yield this.add(data);
            }
            else {
                yield this.update(data, whereObj);
            }
            return data;
        });
    }
    /**
     *
     * 增加一条数据
     * @param obj 数据
     */
    add(obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!obj || typeof obj !== 'object' || !Object.keys(obj))
                return {};
            var result = yield this._execute('add', lodash_1.default.cloneDeep(obj));
            var opt = this._opt;
            if (result.insertId && opt.isIncrement()) {
                obj[opt.acqFirstId()] = result.insertId;
            }
            return obj;
        });
    }
    /**
     * @description 增加一组数据
     * @param arr objectp[]
     */
    addArray(arr) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!arr || arr.length == 0)
                return;
            const result = yield this._execute('addArray', lodash_1.default.cloneDeep(arr));
            const opt = this._opt;
            if (result.insertId && opt.isIncrement()) {
                const idName = opt.acqFirstId();
                for (let obj of arr) {
                    obj[idName] = result.insertId++;
                }
            }
            return arr;
        });
    }
    /**
     * 修改一条数据
     * 返回值，更改数量，0/1
     * @param obj  数据
     * @param whereObj 其他条件
     *
     */
    update(obj, whereObj) {
        return __awaiter(this, void 0, void 0, function* () {
            var ret = yield this._execute('update', obj, whereObj);
            return ret.affectedRows;
        });
    }
    ;
    /**
     * 更新一个数组
     * @param array
     */
    updateArray(array, other, whereObj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!array || array.length == 0)
                return;
            if (array.length == 1 && other == null) {
                return this.update(array[0], whereObj);
            }
            const res = yield this._execute('updateArray', array, { other, whereObj });
            return res.affectedRows;
        });
    }
    /**
     *删除一条数据
     * @param obj
     * @param opts
     */
    del(obj, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            var ret = yield this._execute('del', obj, opts);
            return ret.affectedRows;
        });
    }
    /**
     * 删除一个数组
     * @param array
     */
    delArray(array, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!array || !array.length)
                return 0;
            const res = yield this._execute('delArray', array, opts);
            return res.affectedRows;
        });
    }
    /**
     * 这个方法 不会相应DaoUtil 的 事件
     * @param query
     */
    delByQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            query = Query_1.default.parse(query);
            var ret = yield this._execute('delByQuery', query);
            return ret.affectedRows;
        });
    }
    /**
     * 查询
     * @param query 可以是个结构体，可以是个Cdt，可以是个Query
     */
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const ret = yield this._query('find', query);
            return ret;
        });
    }
    /**
     * 查询数量
     * @param query  可以是个结构体，可以是个Cdt，可以是个Query
     */
    findCnt(query) {
        return __awaiter(this, void 0, void 0, function* () {
            let array = yield this._execute('findCnt', query);
            if (array.length == 0)
                return 0;
            return array[0].cnt;
        });
    }
    /**
     * 查询单条数据
     * @param query  可以是个结构体，可以是个Cdt，可以是个Query
     */
    findOne(query) {
        return __awaiter(this, void 0, void 0, function* () {
            var array = yield this._execute('findOne', query);
            if (array.length == 0)
                return null;
            return array[0];
        });
    }
    /**
     * 根据id查询一条数据
     * @param id
     */
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this._execute('findById', id);
            if (!res || !res.length)
                return null;
            return res[0];
        });
    }
    /**
     * 根据id数组查询一批数据
     * @param ids
     * @key 特定 key (findByKeys)
     * @col 单独列, distinct 数据
     */
    findByIds(ids, key, col) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!ids || !ids.length)
                return [];
            if (!key)
                key = this._opt.acqFirstId();
            var query = new Query_1.default();
            query.in(key, ids);
            if (col != null) {
                let ret = yield this._findCol(query, col);
                return ret;
            }
            let ret = yield this.find(query);
            return ret;
        });
    }
    onlyArray(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!opt || typeof opt != 'object')
                throw new Error('OnlyArray: need a object');
            if (!opt.query && !opt.finds)
                throw new Error('OnlyArray: choose one from query and finds');
            let idCol = this._opt.acqFirstId();
            let sortFun = opt.sortFun || ((obj1, obj2) => obj1[idCol] - obj2[idCol]);
            let checkUpdate = opt.checkUpdate || ((oldData, data) => !itachi_core_1.BeanUtil.checkIgnore(oldData, data));
            let self = this;
            const find = (opt) => __awaiter(this, void 0, void 0, function* () {
                if (opt.finds)
                    return yield opt.finds();
                else
                    return yield self.find(opt.query);
            });
            let list = yield find(opt);
            let mapFun = opt.mapFun;
            if (mapFun == null) {
                throw new Error('没有给出map的函数');
            }
            let array = opt.array;
            if (array == null && opt.data != null) {
                array = [opt.data];
            }
            if (array == null) {
                //throw new Error(this.acq('tableName') + ' 更新的数据为空');
                return [];
            }
            var arrayMap = itachi_core_1.ArrayUtil.toMapByKey(array, mapFun);
            let listMap = itachi_core_1.ArrayUtil.toMapArray(list, mapFun);
            let hasDelData = false;
            for (let e in listMap) {
                var datas = listMap[e];
                if (datas.length > 1) {
                    hasDelData = true;
                    datas.sort(sortFun);
                }
                listMap[e] = datas[0];
            }
            var needAdd = [];
            var needUpdate = [];
            var needDel = [];
            function pushAdd(e, data) {
                if (data == null) {
                    return null;
                }
                if (opt.addFun) {
                    var addFunRet = opt.addFun(data);
                    if (addFunRet != null) {
                        data = addFunRet;
                    }
                }
                needAdd.push(data);
            }
            function pushUpdate(e, data, oldData) {
                if (data == null) {
                    return null;
                }
                if (opt.updateFun) {
                    var updateFunRet = opt.updateFun(data);
                    if (updateFunRet != null) {
                        data = updateFunRet;
                    }
                }
                if (checkUpdate(oldData, data)) {
                    data = itachi_core_1.BeanUtil.shallowClone(data);
                    data[idCol] = oldData[idCol];
                    if (opt.beforeUpdate) {
                        var beforeUpdateRet = opt.beforeUpdate(data, oldData);
                        if (beforeUpdateRet != null) {
                            data = beforeUpdateRet;
                        }
                    }
                    needUpdate.push(data);
                }
            }
            for (let e in arrayMap) {
                var oldData = listMap[e];
                var data = arrayMap[e];
                if (oldData == null) {
                    if (!opt.noAdd)
                        pushAdd(e, data);
                }
                else {
                    if (opt.needUpdate) {
                        if (opt.isUpdate == null || (yield opt.isUpdate(data, oldData))) {
                            pushUpdate(e, data, oldData);
                        }
                    }
                }
            }
            var delArray = [];
            if (opt.needDel) {
                delArray = itachi_core_1.ArrayUtil.notInByKey(list, array, mapFun);
                if (opt.delFun) {
                    delArray = itachi_core_1.ArrayUtil.parse(delArray, opt.delFun);
                }
                if (opt.dels == null) {
                    yield this.delArray(delArray);
                }
                else {
                    yield opt.dels(delArray);
                }
            }
            if (needAdd.length == 0 &&
                needUpdate.length == 0 &&
                !hasDelData &&
                delArray.length == 0) {
                return list;
            }
            let addedArray = null;
            if (opt.adds) {
                addedArray = yield opt.adds(needAdd);
            }
            else {
                addedArray = yield this.addArray(needAdd);
            }
            if (opt.updates) {
                yield opt.updates(needUpdate);
            }
            else {
                yield this.updateArray(needUpdate);
            }
            if (opt.afterFun) {
                yield opt.afterFun();
            }
            if (!opt.noLastFind) {
                list = yield find(opt);
                var arrayMap = itachi_core_1.ArrayUtil.toMapArray(list, mapFun);
                var ret = [];
                for (let e in arrayMap) {
                    var mapArray = arrayMap[e];
                    if (mapArray.length == 1) {
                        ret.push(mapArray[0]);
                    }
                    if (mapArray.length > 1) {
                        mapArray.sort(sortFun);
                        ret.push(mapArray[0]);
                        itachi_core_1.ArrayUtil.addAll(needDel, mapArray.slice(1));
                    }
                }
                if (!opt.noDel) {
                    if (addedArray != null) {
                        let delAddArray = itachi_core_1.ArrayUtil.andByKey(addedArray, delArray, idCol);
                        for (let row of delAddArray) {
                            delete row[idCol];
                        }
                    }
                    if (opt.dels == null) {
                        yield this.delArray(needDel);
                    }
                    else {
                        yield opt.dels(needDel);
                    }
                }
                return ret;
            }
        });
    }
    /**
     * 只查询某一列 distinct col
     * @param {[type]} query         [description]
     * @param {[type]} col           [description]
     * @yield {[type]} [description]
     */
    _findCol(query, col) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!col)
                col = this._opt.acqFirstId();
            query = this._parseQuery(query);
            query.col('distinct ' + col);
            var list = yield this.find(query);
            return list.map(_data => _data[col]);
        });
    }
    /**
     * 查询某一列
     * @param query
     * @param col
     */
    findCol(query, col) {
        return __awaiter(this, void 0, void 0, function* () {
            const ret = this._findCol(query, col);
            return ret;
        });
    }
    findOneCol(query, col) {
        return __awaiter(this, void 0, void 0, function* () {
            var schQuery = Query_1.default.parse(query);
            schQuery.size(1);
            var ret = yield this.findCol(schQuery, col);
            if (ret.length == 0)
                return null;
            return ret[0];
        });
    }
    _parseQuery(query) {
        return Query_1.default.parse(query);
    }
    /**
     * data可空
     * opt.query 查询条件
     * opt.noSch default false, 直接查询, 返回 opt.fun (sortFun) 第一条
     * opt.sortFun
     * opt.data 当 nosch: true, 不需要先查询时，插入 data, 再查询 query
     * 若仅新增一条, 即返回；若 sortFun 后，第一条不是该新增, 则返回第一条, 删除新增
     * @param opt AnyObject
     */
    onlyData(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!opt)
                return null;
            if (!opt.query)
                return null;
            let query = opt.query;
            let fun = opt.fun;
            let data = opt.data || {};
            let noSch = opt.noSch;
            let self = this;
            if (typeof query === 'object' && !(query.clazz == 'Query')) {
                let _queryObj = Object.assign({}, query);
                data = itachi_core_1.BeanUtil.combine(_queryObj, data);
                query = new Query_1.default();
                for (let [k, v] of Object.entries(_queryObj))
                    query.eq(k, v);
            }
            function sch() {
                return __awaiter(this, void 0, void 0, function* () {
                    var list = yield self.find(query);
                    return self._delOther(list, fun);
                });
            }
            var ret = null;
            if (!noSch) {
                ret = yield sch();
                if (ret)
                    return ret;
            }
            var ret = yield this.add(data);
            return sch();
        });
    }
    /**
     * @description list 数组排序后, 只取第一条, 删除剩余数据
     * @param list
     * @param sortFun
     * @param delId
     */
    _delOther(list, sortFun) {
        return __awaiter(this, void 0, void 0, function* () {
            let idCol = this._opt.acqFirstId();
            if (!sortFun) {
                sortFun = (obj1, obj2) => obj1[idCol] - obj2[idCol];
            }
            if (!list || !list.length)
                return null;
            if (list.length == 1)
                return list[0];
            list.sort(sortFun);
            const ret = list[0];
            let delArray = list.slice(1);
            yield this.delArray(delArray);
            return ret;
        });
    }
    /**
     * 返回sql的map
     * map 结构{key:class}
     */
    _acqMap() {
        if (this._map == null) {
            this._map = this._initMap();
        }
        return this._map;
    }
    _execute(key, obj, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            let executor = this._acqExecutor();
            let builder = this._acqBuilder(key);
            return yield executor.execute(builder.build(obj, opts));
        });
    }
    _query(key, obj, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            let executor = this._acqExecutor();
            let builder = this._acqBuilder(key);
            return yield executor.query(builder.build(obj, opts));
        });
    }
    /**
     * 返回
     * @param key 操作，类似add ,update
     */
    _acqBuilder(key) {
        let opt = this._opt;
        let map = this._acqMap();
        let Clazz = map[key];
        if (Clazz == null)
            return null;
        return new Clazz(opt);
    }
}
exports.default = Dao;
