import Sql from '../../sql/Sql';
export default abstract class BaseCdt {
    clazz: string;
    abstract toSql(): Sql;
    getSql(): Sql;
    abstract isHit(row: any): boolean;
    abstract toEs(): any;
    getClazz(): string;
    static parse(cdt: any): BaseCdt;
}
