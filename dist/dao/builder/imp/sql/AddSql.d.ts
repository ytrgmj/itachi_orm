import SqlBuilder from '../SqlBuilder';
import { Sql } from '../../../sql';
export default class AddSql extends SqlBuilder {
    build(obj: object, opts?: object): Sql;
}
