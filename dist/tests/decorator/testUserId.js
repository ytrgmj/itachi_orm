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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserId_1 = __importDefault(require("../../decorator/UserId"));
const ContextId_1 = __importDefault(require("../../decorator/ContextId"));
let TestDao = class TestDao {
    getContext() {
        return {
            getId() {
                return 999;
            },
            getData() {
                return { user_id: 101 };
            }
        };
    }
    add(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('add', opt);
        });
    }
    addArray(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let opt of opts)
                console.log('addArray', opt);
        });
    }
    update(opt) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('update', opt);
        });
    }
    updateArray(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let opt of opts)
                console.log('updateArray', opt);
        });
    }
};
TestDao = __decorate([
    ContextId_1.default(),
    UserId_1.default()
], TestDao);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        var dao = new TestDao();
        yield dao.add({});
        yield dao.update({});
        yield dao.addArray([{}, {}]);
        yield dao.updateArray([{}, {}]);
    });
}
run();
