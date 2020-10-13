import SqlBuilder from '../SqlBuilder';
import { Sql, ValSql } from '../../../sql';
export default class UpdateArraySql extends SqlBuilder {
    /**
    拼凑modify的sql
    */
    build(data: any[], opts?: any): Sql;
    protected _buildBulkUpdate(sql: Sql, data: any[], cols: string[]): void;
    _need(name: string): boolean;
    protected _caseValue(val: any): ValSql;
}
