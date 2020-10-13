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
const DefOnChangeOpt_1 = __importDefault(require("./inf/imp/DefOnChangeOpt"));
class DaoUtil {
    /**
     *
     * 当数据往数据库里面插以后，执行该参数
     *  fun的参数 dao,array[变化的数据的数组形式],type 类型
     * @param fun
     */
    static createAfterRun(fun) {
        return DaoUtil.createOnChangeDecorator(new DefOnChangeOpt_1.default({
            afterAdd(dao, obj) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield fun(dao, [obj], 'add');
                });
            },
            afterAddArray(dao, array) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield fun(dao, array, 'add');
                });
            },
            afterUpdate(dao, cnt, obj, opt) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield fun(dao, [obj], 'update');
                });
            },
            afterUpdateArray(dao, cnt, array, other) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield fun(dao, array, 'update');
                });
            },
            afterDel(dao, cnt, obj, opt) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield fun(dao, [obj], 'del');
                });
            },
            afterDelArray(dao, cnt, array, opt) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield fun(dao, array, 'del');
                });
            }
        }));
    }
    /**
     * 给增加修改的时候设置某个值
     * @param opt
     */
    static createAddAndUpdate(opt) {
        if (opt == null) {
            opt = { addCol: 'sys_add_time', updateCol: 'sys_modify_time' };
        }
        let cols = [];
        let { addCol, updateCol } = opt;
        if (addCol != null)
            cols.push(addCol);
        if (updateCol != null) {
            cols.push(updateCol);
        }
        let changeOpt = {
            onAdd(dao, data) {
                return __awaiter(this, void 0, void 0, function* () {
                    for (let col of cols) {
                        let val = opt.processFun(dao, data);
                        if (val != null)
                            data[col] = val;
                    }
                });
            },
            onUpdate(dao, data, opts) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (updateCol) {
                        let val = opt.processFun(dao, data);
                        if (val != null)
                            data[updateCol] = val;
                    }
                });
            },
            onUpdateArray(dao, array, other, whereObj) {
                return __awaiter(this, void 0, void 0, function* () {
                    if (updateCol) {
                        if (other == null)
                            other = {};
                        let val = opt.processFun(dao, other);
                        if (val != null)
                            other[updateCol] = val;
                    }
                });
            }
        };
        return DaoUtil.createOnChangeDecorator(new DefOnChangeOpt_1.default(changeOpt));
    }
    /**
     * 创建一个基于数据变化的
     */
    static createOnChangeDecorator(changeOpt) {
        return function classDecorator(constructor) {
            return class extends constructor {
                update(obj, opts) {
                    const _superIndex = name => super[name];
                    return __awaiter(this, void 0, void 0, function* () {
                        yield changeOpt.onUpdate(this, obj, opts);
                        var ret = yield _superIndex('update').call(this, obj, opts);
                        yield changeOpt.afterUpdate(this, ret, obj, opts);
                        return ret;
                    });
                }
                add(obj) {
                    const _superIndex = name => super[name];
                    return __awaiter(this, void 0, void 0, function* () {
                        yield changeOpt.onAdd(this, obj);
                        var ret = yield _superIndex('add').call(this, obj);
                        yield changeOpt.afterAdd(this, ret);
                        return ret;
                    });
                }
                del(obj, opts) {
                    const _superIndex = name => super[name];
                    return __awaiter(this, void 0, void 0, function* () {
                        yield changeOpt.onDel(this, obj, opts);
                        var ret = yield _superIndex('del').call(this, obj, opts);
                        yield changeOpt.afterDel(this, ret, obj, opts);
                        return ret;
                    });
                }
                delArray(array, opts) {
                    const _superIndex = name => super[name];
                    return __awaiter(this, void 0, void 0, function* () {
                        yield changeOpt.onDelArray(this, array, opts);
                        var ret = yield _superIndex('delArray').call(this, array, opts);
                        yield changeOpt.afterDelArray(this, ret, array, opts);
                        return ret;
                    });
                }
                addArray(array) {
                    const _superIndex = name => super[name];
                    return __awaiter(this, void 0, void 0, function* () {
                        yield changeOpt.onAddArray(this, array);
                        var ret = yield _superIndex('addArray').call(this, array);
                        yield changeOpt.afterAddArray(this, ret);
                        return ret;
                    });
                }
                updateArray(array, opts, whereObj) {
                    const _superIndex = name => super[name];
                    return __awaiter(this, void 0, void 0, function* () {
                        if (opts == null)
                            opts = {};
                        yield changeOpt.onUpdateArray(this, array, opts, whereObj);
                        var ret = yield _superIndex('updateArray').call(this, array, opts, whereObj);
                        yield changeOpt.afterUpdateArray(this, ret, array, opts, whereObj);
                        return ret;
                    });
                }
            };
        };
    }
}
exports.default = DaoUtil;
