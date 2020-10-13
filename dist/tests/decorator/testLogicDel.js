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
const LogicDel_1 = __importDefault(require("../../decorator/LogicDel"));
const orm_1 = require("../../orm");
let Test1Dao = class Test1Dao extends orm_1.SqlDao {
    _acqExecutor() {
        return {
            execute(sql) {
                console.log('execute sql', sql.toSql(), sql.toVal());
                return { insertId: 1, affectRows: 10 };
            },
            /**
             * 执行查询
             * @param sql
             */
            query(sql) {
                console.log('query sql', sql);
            }
        };
    }
};
Test1Dao = __decorate([
    LogicDel_1.default()
], Test1Dao);
let Test2Dao = class Test2Dao extends orm_1.SqlDao {
    _acqExecutor() {
        return {
            execute(sql) {
                console.log('execute sql', sql.toSql(), sql.toVal());
                return { insertId: 1, affectRows: 10 };
            },
            /**
             * 执行查询
             * @param sql
             */
            query(sql) {
                console.log('query sql', sql);
            }
        };
    }
};
Test2Dao = __decorate([
    LogicDel_1.default({ mode: 2 })
], Test2Dao);
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        var dao1 = new Test1Dao({ tableName: "test1" });
        yield dao1.add({ id: 1 });
        yield dao1.addArray([{ id: 1 }, { id: 2 }]);
        yield dao1.del({ id: 1 });
        yield dao1.delArray([{ id: 1 }, { id: 2 }]);
        var dao2 = new Test2Dao({ tableName: "test2" });
        yield dao2.add({ id: 1 });
        yield dao2.addArray([{ id: 1 }, { id: 2 }]);
        yield dao2.del({ id: 1 });
        yield dao2.delArray([{ id: 1 }, { id: 2 }]);
    });
}
run().catch(e => { console.error(e); });
