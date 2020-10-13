import BaseCache from '../BaseCache'
export default class MapCache extends BaseCache{
    private _map = {};
    async clearCache(){
        this._map = {};
    }
    _getMap(){
        return this._map;
    }
    async keyArray(){
        return this.acqKeys();
    }
    //兼容性考虑
    acqKeys(){
        var map = this._getMap();
        var array = [];
        for(var e in map){
            array.push(e)
        }
        return array;
    }
    async save(e, list){
        var map = this._getMap();
        map[e] = list
    }
    async get(e){
        var map = this._getMap();
        return map[e];
    }
    async _removeCache(array){
        var map = this._getMap();
        for(var row of array){
            delete map[row];
        }
    }
    


}