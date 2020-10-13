"use strict";
/**
 * 逻辑删除装饰器
 */
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
const orm_1 = require("../orm");
function default_1(opt) {
    if (opt == null) {
        opt = {};
    }
    const delCol = opt.col || 'is_del';
    const mode = opt.mode || 1;
    const changeOpt = new orm_1.DefOnChangeOpt({
        onAdd(dao, data) {
            return __awaiter(this, void 0, void 0, function* () {
                data[delCol] = 0;
            });
        },
        onDel(dao, data) {
            return __awaiter(this, void 0, void 0, function* () {
                data[delCol] = 1;
            });
        }
    });
    return function classDecorator(constructor) {
        return class extends constructor {
            constructor() {
                super(...arguments);
                this._delMode = mode; //默认是1
            }
            setDelMode(mode) {
                this._delMode = mode;
            }
            add(obj) {
                const _superIndex = name => super[name];
                return __awaiter(this, void 0, void 0, function* () {
                    yield changeOpt.onAdd(this, obj);
                    var ret = yield _superIndex('add').call(this, obj);
                    return ret;
                });
            }
            del(obj, opts) {
                const _superIndex = name => super[name];
                return __awaiter(this, void 0, void 0, function* () {
                    let ret;
                    if (this._delMode === 2) {
                        yield changeOpt.onDel(this, obj);
                        ret = yield _superIndex('update').call(this, obj, opts);
                    }
                    else {
                        ret = yield _superIndex('del').call(this, obj, opts);
                    }
                    return ret;
                });
            }
            delArray(array, opts) {
                const _superIndex = name => super[name];
                return __awaiter(this, void 0, void 0, function* () {
                    let ret;
                    if (this._delMode === 2) {
                        yield changeOpt.onDelArray(this, array);
                        ret = yield _superIndex('updateArray').call(this, array, opts);
                    }
                    else {
                        ret = yield _superIndex('delArray').call(this, array, opts);
                    }
                    return ret;
                });
            }
            addArray(array) {
                const _superIndex = name => super[name];
                return __awaiter(this, void 0, void 0, function* () {
                    yield changeOpt.onAddArray(this, array);
                    var ret = yield _superIndex('addArray').call(this, array);
                    return ret;
                });
            }
        };
    };
}
exports.default = default_1;
