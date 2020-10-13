import BaseCache from '../BaseCache';
export default class MapCache extends BaseCache {
    private _map;
    clearCache(): Promise<void>;
    _getMap(): {};
    keyArray(): Promise<any[]>;
    acqKeys(): any[];
    save(e: any, list: any): Promise<void>;
    get(e: any): Promise<any>;
    _removeCache(array: any): Promise<void>;
}
