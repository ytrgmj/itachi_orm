"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Trans_1 = __importDefault(require("../../decorator/Trans"));
class TestTrans {
    constructor() {
        this._val = 10;
    }
    test1() {
        this._val++;
        console.log('this._val test1:', this._val);
        this.test2(this._val);
        return 'test1';
    }
    test2(val) {
        console.log('test2', val);
    }
}
__decorate([
    Trans_1.default()
], TestTrans.prototype, "test1", null);
let ins = new TestTrans();
console.log(ins.test1());
