import Query from '../../../query/Query';
import Sql from '../../../sql/Sql';
import FindSql from './FindSql';
export default class FindOneSql extends FindSql {
    protected _buildPage(sql: Sql, query: Query): Sql;
}
