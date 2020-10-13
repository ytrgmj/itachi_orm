import ArrayCdt from '../ArrayCdt';
import Sql from '../../../sql/Sql';
export default class OrCdt extends ArrayCdt {
    toEs(): {};
    toSql(): Sql;
    isHit(obj: any): boolean;
}
