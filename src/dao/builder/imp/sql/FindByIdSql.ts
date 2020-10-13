import SqlBuilder from '../SqlBuilder';
import { ColSql, Sql, ValSql } from '../../../sql';

export default class FindByIdSql extends SqlBuilder {
    build(data: string | number | object, opts?: object): Sql {
        var opt = this._opt;
        let sql = new Sql()
        this._pushSqlTxt(sql, 'select * from')
        this._pushSqlTxt(sql, opt.getTableName());
        this._pushSqlTxt(sql, 'where')
        var ids = opt.acqIds()
        if (ids.length == 1) {
            this._pushSqlTxt(sql, new ColSql(ids[0]))
            this._pushSqlTxt(sql, '=')
            this._pushSqlTxt(sql, new ValSql(typeof data === 'object' ? data[ids[0]] : data))
        } else if (typeof data === 'object') {
            for (let i = 0; i < ids.length; i++) {
                if (i > 0) this._pushSqlTxt(sql, 'and')
                const name = ids[i]
                this._pushSqlTxt(sql, new ColSql(name))
                this._pushSqlTxt(sql, '=')
                this._pushSqlTxt(sql, new ValSql(data[name]))
            }
        }
        return sql
    }

}