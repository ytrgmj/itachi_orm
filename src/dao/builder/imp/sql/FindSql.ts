import BaseFind from './BaseFind'
import Query from '../../../query/Query'
import Sql from '../../../sql/Sql'

export default class FindSql extends BaseFind{

    protected _buildFind(query:Query):Sql{
        var opt = this._opt;
        var tableName = opt.getTableName();
        if(query == null)
            return new Sql(`select  * from ${tableName} `);
        var cols = query.getCol();
        if(cols.length ==0 )
            return new Sql(`select  * from ${tableName} `);
        var str = cols.join(',') // select 后的列形式过于负责, 禁止使用 ColSql 转义

        return new Sql(`select ${str} from ${tableName} `);
    }


}