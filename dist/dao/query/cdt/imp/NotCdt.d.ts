/**
 * 查询条件，
 * 支持sql 、monggo、es
 */
import Sql from '../../../sql/Sql';
import BaseCdt from '../BaseCdt';
export default class NotCdt extends BaseCdt {
    private _cdt;
    constructor(cdt: BaseCdt);
    toEs(): {
        bool: {
            must_not: any[];
        };
    };
    toSql(): Sql;
    isHit(obj: any): boolean;
}
