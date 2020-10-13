import Sql from "../../sql/Sql";
import Builder from '../Builder';
export default abstract class SqlBuilder extends Builder {
    protected _pushSqlTxt(sql: Sql, str: string | Sql, val?: any): void;
    protected _isValidCol(col: string): boolean;
    protected _need(name: string): Boolean;
    protected _findCols(dataArray: object[]): any[];
}
