import { SqlUtil } from '../sqlUtil';
export default class SqlUtilFactory {
    get(type: string): SqlUtil;
}
