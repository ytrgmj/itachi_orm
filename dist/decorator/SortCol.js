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
const orm_1 = require("../orm");
const DefOnChangeOpt_1 = __importDefault(require("../util/inf/imp/DefOnChangeOpt"));
/**
 * 设置排序字段
 */
function default_1() {
    return orm_1.DaoUtil.createOnChangeDecorator(new DefOnChangeOpt_1.default({
        onAdd(dao, data) {
            return __awaiter(this, void 0, void 0, function* () {
                if (data && data.sort == null) {
                    data.sort = new Date().getTime();
                }
            });
        },
        onAddArray(dao, array) {
            return __awaiter(this, void 0, void 0, function* () {
                if (array) {
                    let time = new Date().getTime();
                    for (let i = 0; i < array.length; i++) {
                        if (array[i]['sort'] == null)
                            array[i]['sort'] = time + i;
                    }
                }
            });
        }
    }));
}
exports.default = default_1;
