import Sql from './Sql';
export default class ColSql extends Sql {
    protected cols: string[];
    /**
     * @description 列转义
     * @description 仅针对 表名、列名 等确定名称的列;
     * @description select 表达式中的列，过去复杂，禁止在其中使用
     * @param cols
     */
    constructor(cols?: string | string[]);
    toSql(type?: string): string;
    toVal(): null;
    /**
     * @description 考虑抛弃, 感觉很容易误用， sql 中 col 的位置并不是连贯的
     * @param cols
     */
    add(col: string | ColSql): ColSql;
}
