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
/**
 * 事务注解
 */
function default_1() {
    return function (target, propertyName, property) {
        var fun = target[propertyName];
        target[propertyName] = function () {
            return __awaiter(this, arguments, void 0, function* () {
                let context = this._context;
                let transManager = null;
                if (context != null) {
                    transManager = context.get('TransManager');
                }
                else {
                    throw new Error('this._context为空，无法从上下文得到事件管理器');
                }
                var ret;
                try {
                    if (transManager != null) {
                        console.log('begin ');
                        yield transManager.beginTran();
                    }
                    ret = yield fun.apply(this, arguments);
                    if (transManager != null) {
                        console.log('commitTran ');
                        yield transManager.commitTran();
                    }
                }
                catch (e) {
                    if (transManager != null) {
                        console.log('rollbackTran');
                        yield transManager.rollbackTran();
                    }
                    throw e;
                }
                return ret;
            });
        };
        return target;
    };
}
exports.default = default_1;
