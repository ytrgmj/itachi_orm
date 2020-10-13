import SqlBuilder from '../SqlBuilder';
import { Sql } from '../../../sql';
export default class AddArraySql extends SqlBuilder {
    build(arr: object[], opts?: object): Sql;
    _need(name: string): boolean;
}
