import BaseFind from './BaseFind';
import { Sql } from '../../../sql';
import Query from '../../../query/Query';
export default class extends BaseFind {
    _buildFind(query: Query): Sql;
}
