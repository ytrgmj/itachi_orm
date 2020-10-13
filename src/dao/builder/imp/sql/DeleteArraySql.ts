import SqlBuilder from '../SqlBuilder';
import { ColSql, Sql, ValSql } from '../../../sql';
import BaseCdt from '../../../query/cdt/BaseCdt';

export default class AddSql extends SqlBuilder {
    build(arr: any[], opts?: any): Sql {
        const opt = this._opt;
        let idCol = opt.acqFirstId();
        const ids = arr.map(_data => (typeof _data === 'object' && _data) ? _data[idCol] : _data).filter(item => item)

        
        const sql = new Sql()
        this._pushSqlTxt(sql, 'delete from ')
        this._pushSqlTxt(sql, opt.getTableName())
        this._pushSqlTxt(sql, 'where ')

        const idNames = opt.acqIds()
        this._pushSqlTxt(sql, new ColSql(idNames[0]))
        this._pushSqlTxt(sql, ' in')

        this._pushSqlTxt(sql, new ValSql(ids))

        if (opts) {
            this._pushSqlTxt(sql, 'and')
            let cdt = BaseCdt.parse(opts);
            this._pushSqlTxt(sql,cdt.toSql());
        }
        return sql
    }

}