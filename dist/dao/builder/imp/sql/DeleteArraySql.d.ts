import SqlBuilder from '../SqlBuilder';
import { Sql } from '../../../sql';
export default class AddSql extends SqlBuilder {
    build(arr: any[], opts?: any): Sql;
}
