import SqlBuilder from '../SqlBuilder';
import Sql from '../../../sql/Sql';
import Query from '../../../query/Query';
export default abstract class BaseFind extends SqlBuilder {
    /**
     * 构建where 后面的
     */
    protected _buildWhere(query: Query): Sql;
    protected _buildJoinTable(query: Query): Sql;
    protected abstract _buildFind(query: Query): Sql;
    protected _buildGroup(query: Query): Sql;
    protected _buildHaving(query: Query): Sql;
    _buildOrder(query: Query): Sql;
    /**
     * 产生分页的sql
     * @param sql
     * @param query
     */
    protected _buildPage(sql: Sql, query: Query): Sql;
    build(query: any, opts?: any): Sql;
}
