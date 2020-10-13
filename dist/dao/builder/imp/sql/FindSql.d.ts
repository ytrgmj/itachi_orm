import BaseFind from './BaseFind';
import Query from '../../../query/Query';
import Sql from '../../../sql/Sql';
export default class FindSql extends BaseFind {
    protected _buildFind(query: Query): Sql;
}
