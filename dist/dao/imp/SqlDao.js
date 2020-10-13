"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Dao_1 = __importDefault(require("../Dao"));
const AddSql_1 = __importDefault(require("../builder/imp/sql/AddSql"));
const AddArraySql_1 = __importDefault(require("../builder/imp/sql/AddArraySql"));
const UpdateSql_1 = __importDefault(require("../builder/imp/sql/UpdateSql"));
const UpdateArraySql_1 = __importDefault(require("../builder/imp/sql/UpdateArraySql"));
const DelSql_1 = __importDefault(require("../builder/imp/sql/DelSql"));
const DeleteArraySql_1 = __importDefault(require("../builder/imp/sql/DeleteArraySql"));
const FindSql_1 = __importDefault(require("../builder/imp/sql/FindSql"));
const FindCntSql_1 = __importDefault(require("../builder/imp/sql/FindCntSql"));
const FindOneSql_1 = __importDefault(require("../builder/imp/sql/FindOneSql"));
const FindByIdSql_1 = __importDefault(require("../builder/imp/sql/FindByIdSql"));
const sql_1 = require("../builder/imp/sql");
class SqlDao extends Dao_1.default {
    _initMap() {
        return {
            add: AddSql_1.default,
            addArray: AddArraySql_1.default,
            update: UpdateSql_1.default,
            updateArray: UpdateArraySql_1.default,
            del: DelSql_1.default,
            delArray: DeleteArraySql_1.default,
            find: FindSql_1.default,
            findCnt: FindCntSql_1.default,
            findOne: FindOneSql_1.default,
            findById: FindByIdSql_1.default,
            delByQuery: sql_1.DelByQuery
        };
    }
}
exports.default = SqlDao;
