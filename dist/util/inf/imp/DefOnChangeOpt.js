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
class DefOnChangeOpt {
    constructor(opt) {
        this._opt = opt;
    }
    onAdd(dao, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._opt.onAdd) {
                yield this._opt.onAdd(dao, obj);
            }
        });
    }
    afterAdd(dao, obj) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._opt.afterAdd) {
                yield this._opt.afterAdd(dao, obj);
            }
        });
    }
    onUpdate(dao, obj, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._opt.onUpdate) {
                yield this._opt.onUpdate(dao, obj, opts);
            }
        });
    }
    afterUpdate(dao, cnt, obj, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._opt.afterUpdate) {
                yield this._opt.afterUpdate(dao, cnt, obj, opts);
            }
        });
    }
    onDel(dao, obj, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._opt.onDel) {
                yield this._opt.onDel(dao, obj, opts);
            }
        });
    }
    afterDel(dao, cnt, obj, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._opt.afterDel) {
                yield this._opt.afterDel(dao, cnt, obj, opts);
            }
        });
    }
    onAddArray(dao, arr) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = this._opt;
            let onAddArray = opt.onAddArray;
            if (onAddArray == null && opt.onAdd != null) {
                onAddArray = function (dao, array) {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (let obj of array) {
                            yield opt.onAdd(dao, obj);
                        }
                    });
                };
            }
            if (onAddArray != null)
                yield onAddArray(dao, arr);
        });
    }
    afterAddArray(dao, arr) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = this._opt;
            let afterAddArray = opt.afterAddArray;
            if (afterAddArray != null) {
                yield afterAddArray(dao, arr);
            }
        });
    }
    onUpdateArray(dao, array, other, whereObj) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = this._opt;
            let onUpdateArray = opt.onUpdateArray;
            if (onUpdateArray == null && opt.onUpdate != null) {
                onUpdateArray = function (dao, array, other) {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (let obj of array) {
                            yield opt.onUpdate(dao, obj);
                        }
                    });
                };
            }
            if (onUpdateArray != null) {
                yield onUpdateArray(dao, array, other, whereObj);
            }
        });
    }
    afterUpdateArray(dao, cnt, array, other) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = this._opt;
            let afterUpdateArray = opt.afterUpdateArray;
            if (afterUpdateArray != null) {
                yield afterUpdateArray(dao, cnt, array, other);
            }
        });
    }
    onDelArray(dao, array, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = this._opt;
            let onDelArray = opt.onDelArray;
            if (onDelArray == null && opt.onDel != null) {
                onDelArray = function (dao, array, other) {
                    return __awaiter(this, void 0, void 0, function* () {
                        for (let obj of array) {
                            yield opt.onDel(dao, obj);
                        }
                    });
                };
            }
            if (onDelArray != null) {
                yield onDelArray(dao, array, opts);
            }
        });
    }
    afterDelArray(dao, cnt, array, opts) {
        return __awaiter(this, void 0, void 0, function* () {
            let opt = this._opt;
            let afterDelArray = opt.afterDelArray;
            if (afterDelArray != null) {
                yield afterDelArray(dao, cnt, array, opts);
            }
        });
    }
}
exports.default = DefOnChangeOpt;
