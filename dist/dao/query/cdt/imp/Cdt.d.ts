import { Sql } from '../../../sql';
import BaseCdt from '../BaseCdt';
export default class Cdt extends BaseCdt {
    private op;
    private col;
    private val;
    constructor(col: string, val: any, op?: string);
    toEs(): void;
    getCol(): string;
    getOp(): string;
    getVal(): any;
    toSql(): Sql;
    isHit(obj: any): any;
}
