import BaseCdt from '../BaseCdt'
import { Sql, ColSql } from '../../../sql'

export default class IsNotNullCdt extends BaseCdt{
    
    private _col:string;
    constructor(col){
        super();
        this._col = col
    }
    toSql():Sql {
        let sql = new Sql()
        sql.add(new ColSql(this._col))
        sql.add('is not null')
        return sql
    }

    toEs() {
        return {
            exists:{
                field:this._col
            }
        }
    }

    isHit(obj) {
        return null != obj[this._col]
        
    }
}