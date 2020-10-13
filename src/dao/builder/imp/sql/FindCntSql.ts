import BaseFind from './BaseFind'
import Query from '../../../query/Query'
import Sql from '../../../sql/Sql'

export default class FindCntSql extends BaseFind{
    
    protected _buildFind(query:Query):Sql{
        var opt = this._opt;
        var tableName = opt.getTableName();
      
        
        return new Sql(`select count(*) as cnt from ${tableName} `);
    }

    protected _buildPage(sql:Sql,query:Query):Sql{
        return sql;
    }
    
    _buildOrder(query:Query):Sql{
        return null;
    }
}