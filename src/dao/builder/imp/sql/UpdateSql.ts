import SqlBuilder from '../SqlBuilder'
import BaseCdt from '../../../query/cdt/BaseCdt';
import { ColSql, ValSql, Sql } from '../../../sql';

export default class UpdateSql​​ extends SqlBuilder{
    /**
    拼凑modify的sql
    */
    build (data:any,opts?:any):Sql {
        var array = new Sql();
        this._buildFront(array,data);
        var cnt = 0
        var ids = this._opt.acqIds();
        for(var id of ids) {
            if (cnt++ > 0) {
                this._pushSqlTxt(array, 'and')
            }
            this._pushSqlTxt(array, new ColSql(id))
            this._pushSqlTxt(array, '=')
            this._pushSqlTxt(array, new ValSql(data[id]))
        }
        if (opts) {
            this._pushSqlTxt(array, 'and')
            let cdt = BaseCdt.parse(opts);
            this._pushSqlTxt(array,cdt.toSql());
        }
        return array
    }
    protected _buildFront (array:Sql, data) {
        var opt = this._opt;
        this._pushSqlTxt(array, 'update ')
        this._pushSqlTxt(array, opt.getTableName())
        this._pushSqlTxt(array, ' set')
        var cnt = 0
        for(var k in data) {
            if (!opt.isId(k) && this._isValidCol(k)) {
                let v = data[k];
                if (cnt++ > 0) {
                    this._pushSqlTxt(array, ',')
                }
                
                if (v != null && v.getSql) {
                    let sql:Sql = v.getSql();
                    this._pushSqlTxt(array,sql);
                } else {
                    this._pushSqlTxt(array, new ColSql(k))
                    this._pushSqlTxt(array, '=')
                    this._pushSqlTxt(array, new ValSql(v))
                }
            }
        }
        this._pushSqlTxt(array, 'where')
        
    }
  
    
}