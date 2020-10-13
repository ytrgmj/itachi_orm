import BaseCdt from '../BaseCdt';
import { Sql } from '../../../sql';
export default class IsNotNullCdt extends BaseCdt {
    private _col;
    constructor(col: any);
    toSql(): Sql;
    toEs(): {
        exists: {
            field: string;
        };
    };
    isHit(obj: any): boolean;
}
