import SqlUtil from './SqlUtil';
export default class PgUtil extends SqlUtil {
    constructor();
    escapeParameters(count: object): string;
    returnStr(cols: string[]): string;
    /**
     * @description node
     * @param val
     */
    valTypeToPgType(val: any): string;
    /**
     * @description 针对 typeof 为 object 的数据
     * @param val
     */
    objectToPgType(val: object): string;
    arrayToPgType(val: any[]): string;
    /**
     * @description 多维数组, 且数组内数据同一类型
     * @param val <Array>
     * @param level: 默认一维数组
     * @returns { type: 数据类型, level: 数组层级}
     */
    private _arrayLevelAndType;
}
