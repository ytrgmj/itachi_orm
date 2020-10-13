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
const BaseCache_1 = __importDefault(require("../BaseCache"));
class MapCache extends BaseCache_1.default {
    constructor() {
        super(...arguments);
        this._map = {};
    }
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            this._map = {};
        });
    }
    _getMap() {
        return this._map;
    }
    keyArray() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.acqKeys();
        });
    }
    //兼容性考虑
    acqKeys() {
        var map = this._getMap();
        var array = [];
        for (var e in map) {
            array.push(e);
        }
        return array;
    }
    save(e, list) {
        return __awaiter(this, void 0, void 0, function* () {
            var map = this._getMap();
            map[e] = list;
        });
    }
    get(e) {
        return __awaiter(this, void 0, void 0, function* () {
            var map = this._getMap();
            return map[e];
        });
    }
    _removeCache(array) {
        return __awaiter(this, void 0, void 0, function* () {
            var map = this._getMap();
            for (var row of array) {
                delete map[row];
            }
        });
    }
}
exports.default = MapCache;
