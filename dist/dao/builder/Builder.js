"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DaoOpt_1 = __importDefault(require("../opt/DaoOpt"));
class Builder {
    constructor(opt) {
        if (opt == null)
            opt = {};
        if (!(opt instanceof DaoOpt_1.default))
            opt = new DaoOpt_1.default(opt);
        this._opt = opt;
    }
}
exports.default = Builder;
