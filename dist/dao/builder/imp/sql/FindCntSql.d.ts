import BaseFind from './BaseFind';
import Query from '../../../query/Query';
import Sql from '../../../sql/Sql';
export default class FindCntSql extends BaseFind {
    protected _buildFind(query: Query): Sql;
    protected _buildPage(sql: Sql, query: Query): Sql;
    _buildOrder(query: Query): Sql;
}
