import BaseFind from './BaseFind'
import { Sql } from '../../../sql';
import Query from '../../../query/Query';
export default class extends BaseFind{
    _buildFind(query:Query):Sql{
        var opt = this._opt;
        var tableName = opt.getTableName();
      
        
        return new Sql(`delete  from ${tableName} `);
    }
}