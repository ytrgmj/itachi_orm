"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SqlUtil {
    escapeId(col = '') {
        if (col.indexOf(this.escapeCharacter) != -1)
            col = ''; // 包含转义即认为 sql 注入
        col = col.split('.') // 针对 table.id 形式处理
            .map(_col => [this.escapeCharacter, _col, this.escapeCharacter].join(''))
            .join('.');
        return col;
    }
}
exports.default = SqlUtil;
