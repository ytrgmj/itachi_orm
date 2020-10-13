import ArrayCdt from '../ArrayCdt';
import Sql from '../../../sql/Sql';
export default class AndCdt extends ArrayCdt {
    toSql(): Sql;
    toEs(): {};
    isHit(obj: any): boolean;
}
