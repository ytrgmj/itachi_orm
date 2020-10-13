"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TransManager_1 = __importDefault(require("../tans/TransManager"));
class OrmContext {
    static regContext(context) {
        context.regClazz('TransManager', TransManager_1.default);
    }
}
exports.default = OrmContext;
