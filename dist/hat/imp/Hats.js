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
const BaseHat_1 = __importDefault(require("../BaseHat"));
const orm_1 = require("../../orm");
class Hats extends BaseHat_1.default {
    getKeys() {
        let opt = this._opt;
        return opt.keys;
    }
    getHatsClazz() {
        let opt = this._opt;
        return opt.hatsClazz;
    }
    getHats() {
        let hatsClazz = this.getHatsClazz();
        let context = this.getContext();
        if (hatsClazz != null) {
            return hatsClazz.map((clazz) => {
                return new clazz({
                    context,
                    fun: this._fun
                });
            });
        }
        let keys = this.getKeys();
        return keys.map((key) => {
            return new orm_1.Hat({
                context,
                key,
                fun: this._fun
            });
        });
    }
    process(list) {
        return __awaiter(this, void 0, void 0, function* () {
            let hats = this.getHats();
            /*
            let array = [];
            for(let hat of hats){
                array.push(hat.process(list));
            }
            await Promise.all(array);*/
            for (let hat of hats) {
                yield hat.process(list);
            }
            return list;
        });
    }
}
exports.default = Hats;
