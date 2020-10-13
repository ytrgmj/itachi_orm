import SqlBuilder from '../SqlBuilder';
import { Sql } from '../../../sql';
export default class UpdateSql extends SqlBuilder {
    /**
    拼凑modify的sql
    */
    build(data: any, opts?: any): Sql;
    protected _buildFront(array: Sql, data: any): void;
}
