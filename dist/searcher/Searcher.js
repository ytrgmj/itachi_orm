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
class Searcher {
    constructor() {
        this._map = {};
    }
    setContext(context) {
        this._context = context;
    }
    getContext() {
        return this._context;
    }
    getIdKey() {
        return this.getKey() + '_id';
    }
    getNoKey() {
        return this.getKey() + '_no';
    }
    afterBuild(context) {
        this.reg('getById', new Inquiry_1.default({
            col: this.getIdKey()
        }));
        this.init(context);
        var map = this._map;
        for (var e in map) {
            let inquiry = map[e];
            inquiry.setKey(this.getKey());
            inquiry.setContext(this._context);
        }
    }
    /**
     * 注册key
     * @param inquiryKey
     * @param inquiry
     */
    reg(inquiryKey, inquiry) {
        inquiry.setSchColsOnReg(this.getSchCols());
        this._map[inquiryKey] = inquiry;
    }
    getSchCols() {
        return null;
    }
    _getAll() {
        var array = [];
        for (var e in this._map) {
            var inquiry = this._map[e];
            if (inquiry) {
                array.push(inquiry);
            }
        }
        return array;
    }
    save(key, array) {
        return __awaiter(this, void 0, void 0, function* () {
            var inquiry = this.get(key);
            if (inquiry) {
                yield inquiry.save(array);
            }
        });
    }
    get(key) {
        return this._map[key];
    }
    saveAll(array) {
        return __awaiter(this, void 0, void 0, function* () {
            var list = this._getAll();
            for (var i = 0; i < list.length; i++) {
                if (list[i].couldSaveAll()) {
                    yield list[i].save(array);
                }
            }
            // list.forEach(obj=>obj.save(array));
        });
    }
    /**
     * 清空缓存，对于多表查询可能无效
     */
    clearCache() {
        var list = this._getAll();
        for (var i = 0; i < list.length; i++) {
            list[i].clearCache();
        }
    }
    /**
     * 根据ids 列表查询多条记录
     * @param array
     */
    findByIds(array) {
        return __awaiter(this, void 0, void 0, function* () {
            var inquiry = this.get('getById');
            return yield inquiry.find(array);
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id == null)
                return null;
            var list = yield this.findByIds([id]);
            return list[0];
        });
    }
}
exports.default = Searcher;
const Inquiry_1 = __importDefault(require("./inquiry/imp/Inquiry"));
