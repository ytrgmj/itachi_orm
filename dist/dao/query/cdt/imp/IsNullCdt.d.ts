import BaseCdt from '../BaseCdt';
import { Sql } from '../../../sql';
export default class IsNullCdt extends BaseCdt {
    private _col;
    constructor(col: any);
    toSql(): Sql;
    toEs(): {
        missing: {
            field: string;
        };
    };
    isHit(obj: any): boolean;
}
