"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseFind_1 = __importDefault(require("./BaseFind"));
const Sql_1 = __importDefault(require("../../../sql/Sql"));
class FindSql extends BaseFind_1.default {
    _buildFind(query) {
        var opt = this._opt;
        var tableName = opt.getTableName();
        if (query == null)
            return new Sql_1.default(`select  * from ${tableName} `);
        var cols = query.getCol();
        if (cols.length == 0)
            return new Sql_1.default(`select  * from ${tableName} `);
        var str = cols.join(','); // select 后的列形式过于负责, 禁止使用 ColSql 转义
        return new Sql_1.default(`select ${str} from ${tableName} `);
    }
}
exports.default = FindSql;
