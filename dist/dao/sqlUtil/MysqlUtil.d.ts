import SqlUtil from './SqlUtil';
export default class MysqlUtil extends SqlUtil {
    constructor();
    escapeParameters(): string;
    returnStr(cols: string[]): string;
}
