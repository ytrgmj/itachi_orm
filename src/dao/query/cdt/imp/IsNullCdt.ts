import BaseCdt from '../BaseCdt'
import { Sql, ColSql } from '../../../sql'

export default class IsNullCdt extends BaseCdt{
    
    private _col:string;
    constructor(col){
        super();
        this._col = col
    }
    toSql():Sql {
        let sql = new Sql()
        sql.add(new ColSql(this._col))
        sql.add('is null')
        return sql
    }
    

    toEs() {
        return {
            missing:{
                field:this._col
            }
        }
    }

    isHit(obj) {
        return null == obj[this._col]
        
    }
    

}