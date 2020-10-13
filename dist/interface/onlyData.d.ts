import Query from '../dao/query/Query';
import { AnyObject } from './anyObject';
interface sortFun {
    (obj1: AnyObject, obj2: AnyObject): number;
}
export interface onlyDataInterface {
    query: Query | AnyObject;
    data?: AnyObject;
    fun?: sortFun;
    noSch?: Boolean;
}
export {};
