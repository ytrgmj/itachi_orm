/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-05 15:12:34
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-14 17:50:15
 */

import {  BaseOption } from './poolOptions'
import {  ConfigFac } from 'itachi_core'
const configKey = 'datasources';
export default abstract class BasePoolFac {

    protected _init: Boolean
    protected _map: object;

    protected _needNoType(){
        return false;
    }
    protected abstract getType():string;
    /**
     * init 的时候调用
      * @description 具体实现
      * @param config 
      */
    protected abstract createPool(config) 

  

    constructor() {
        this._init = false
        this._map = {}
    }

    protected _initConfig(opt) {
        const map:object = {}
        for (let e in opt) {
            map[e] = this.createPool(opt[e])
        }
        return map
    }

    protected _formatConnectOption(config: BaseOption): any {
        return config
    }

    /**
     * @description 连接池工厂初始化
     */
    init() {
        if (this._init) return
        this._init = true
        let opt = this._loadConfigs();
        this._map = this._initConfig(opt)
        
    }

    getKeys(){
        this.init();
        let ret = [];
        for(var e in this._map){
            ret.push(e)
        }
        return ret;
    }

    _loadConfigs():any{
        var ret = {};
        
        
        var datasources = ConfigFac.get(configKey);
        for(var e in datasources){
            if(this._isMyConfig(datasources[e]))
                ret [e] = datasources[e];
        }
        return ret;
    }
    
    _isMyConfig(config){
        if(config.type == this.getType()){
            return true;
        }
        if(this._needNoType() && (config.type == null)){
            return true;
        }
        return false;
    }


    getDefPoolName(){
        return 'mysql';
    }
    /**
     * @description get specific pool from factory
     * @param poolName
     */
    get(poolName: string ) {
        if(poolName == null)
            poolName = this.getDefPoolName()
        this.init()
        if (!this._init) throw new Error('Please load database config first')

        if (!poolName) return this._map[Object.keys(this._map)[0]]
       
        return this._map[poolName]
    }

   
    
}
