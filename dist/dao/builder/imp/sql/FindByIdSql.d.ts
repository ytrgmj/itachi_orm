import SqlBuilder from '../SqlBuilder';
import { Sql } from '../../../sql';
export default class FindByIdSql extends SqlBuilder {
    build(data: string | number | object, opts?: object): Sql;
}
