import Sql from './Sql';
export default class ReturnSql extends Sql {
    protected cols: string[];
    /**
     * @description 返回指定列
     * @param cols
     */
    constructor(cols?: string | string[]);
    toSql(type: string): string;
    toVal(): null;
    /**
     * @description
     * @param col
     */
    add(col: string | ReturnSql): ReturnSql;
}
