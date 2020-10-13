import SqlBuilder from '../SqlBuilder'
import { Sql, ColSql, ValSql } from '../../../sql'
import BaseCdt from '../../../query/cdt/BaseCdt'


export default class UpdateArraySql extends SqlBuilder {
    // TODO: 支持多条件, 多 id, 改造 sql 拼接, 这样拼太长了
    /**
    拼凑modify的sql
    */
    build(data: any[], opts?: any): Sql {
        
        let other = null;
        let whereObj = null;
        if(opts != null){
            other = opts.other;
            
            whereObj = opts.whereObj;
            
            
        }
        let sql = new Sql();
        let opt = this._opt;
        this._pushSqlTxt(sql, 'update ')
        this._pushSqlTxt(sql, opt.getTableName())
        this._pushSqlTxt(sql, ' set')

        const cols: string[] = this._findCols(data)

        this._buildBulkUpdate(sql, data, cols);

        if (other) {
            var index = cols.length
            for (var e in other) {
                if (index > 0) {
                    this._pushSqlTxt(sql, ',')
                }
                if (other[e] && other[e].getSql) {
                    this._pushSqlTxt(sql, other[e].getSql())
                } else {
                    this._pushSqlTxt(sql, new ColSql(e))
                    this._pushSqlTxt(sql, '=')
                    this._pushSqlTxt(sql, new ValSql(other[e]))
                }
                index++
            }
        }
        let idCol = opt.acqFirstId()
        const ids = data.map(_obj => _obj[idCol])

        this._pushSqlTxt(sql, 'where')
        this._pushSqlTxt(sql, new ColSql(idCol))
        this._pushSqlTxt(sql, 'in')
        this._pushSqlTxt(sql, new ValSql(ids))
        
        if(whereObj != null){
            this._pushSqlTxt(sql, 'and')
            let cdt = BaseCdt.parse(whereObj);
            
            this._pushSqlTxt(sql,cdt.toSql());
        }
        return sql
    }


    protected _buildBulkUpdate(sql: Sql, data: any[], cols: string[]) {
        let cnt = 0
        let opt = this._opt;
        let idCol = opt.acqFirstId()
        for (let t = 0; t < cols.length; t++) {
            const col = cols[t]
            if (!this._need(col)) {
                continue
            }
            if (cnt++ > 0) {
                this._pushSqlTxt(sql, ',')
            }
            this._pushSqlTxt(sql, new ColSql(col))
            this._pushSqlTxt(sql, '= CASE ')
            this._pushSqlTxt(sql,new ColSql(idCol))
            for (var i = 0; i < data.length; i++) {
                const _data = data[i]
                this._pushSqlTxt(sql, 'WHEN')
                this._pushSqlTxt(sql, new ValSql(_data[idCol]))
                this._pushSqlTxt(sql, 'THEN')

                if (_data[col] && _data[col].getSql) {
                    this._pushSqlTxt(sql, _data[col].getSql())
                } else {
                    this._pushSqlTxt(
                        sql,
                        this._caseValue(_data[col] )
                    )
                }
            }
            this._pushSqlTxt(sql, 'end')
        }
    }

    _need(name: string) {
        const ret = super._need(name)
        if (!ret) return false

        return !this._opt.isId(name)
    }

    protected _caseValue(val: any): ValSql {
        return new ValSql(val)
    }

}