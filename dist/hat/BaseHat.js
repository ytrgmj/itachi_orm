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
class BaseHat {
    constructor(opt) {
        if (opt == null) {
            opt = {};
        }
        this._opt = opt;
        if (opt.fun) {
            this._fun = opt.fun;
        }
    }
    getContext() {
        return this._opt.context;
    }
    processOne(row) {
        return __awaiter(this, void 0, void 0, function* () {
            var array = yield this.process([row]);
            return array[0];
        });
    }
}
exports.default = BaseHat;
