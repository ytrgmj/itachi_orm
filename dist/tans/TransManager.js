"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
const itachi_core_1 = require("itachi_core");
class TransManager {
    constructor() {
        this._transNum = 0;
    }
    setContext(context) {
        this._context = context;
    }
    getTransNum() {
        return this._transNum;
    }
    /**
     * 开始事物
     */
    beginTran() {
        return __awaiter(this, void 0, void 0, function* () {
            let map = this._map;
            for (let trans of map.values()) {
                yield trans.beginTran();
            }
            this._printLog('开始事务');
            this._transNum++;
        });
    }
    /**
     *
     * 提交事务
     */
    commitTran() {
        return __awaiter(this, void 0, void 0, function* () {
            this._transNum--;
            let map = this._map;
            for (let trans of map.values()) {
                yield trans.commitTran();
            }
            this._printLog('提交事务');
        });
    }
    /**
     * 回滚
     */
    rollbackTran() {
        return __awaiter(this, void 0, void 0, function* () {
            this._transNum--;
            let map = this._map;
            for (let trans of map.values()) {
                yield trans.rollbackTran();
            }
            this._printLog('回滚事务');
        });
    }
    _printLog(msg) {
        let logger = this._context.getLogger();
        logger.debug(msg);
    }
}
__decorate([
    itachi_core_1.Bean('DbTrans')
], TransManager.prototype, "_map", void 0);
exports.default = TransManager;
