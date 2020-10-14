interface FindResult{
    /**
     * 查询结果
     */
    ret:Array<any>
    /**
     * 不存在的key
     */
    list:Array<any>
}

export default abstract class BaseCache{
    protected _inquiry:BaseInquiry;
    protected _key:string;

    abstract async keyArray():Promise<Array<string>>;
    
    abstract async save(e:string, list:Array<any>);
    abstract async get(e):Promise<Array<string>>;

    abstract async _removeCache(keys);

    abstract acqKeys();
    
    abstract clearCache();

    constructor(baseInquiry:BaseInquiry){
        this._inquiry = baseInquiry;
    }

    async  removeCache(params){
        if(params == null)
          return;
        if(!(params instanceof Array))
          params = [params]
        if(params.length == 0) 
          return;
        var keys = this._parseKeyArray(params)
        keys = ArrayUtil.distinct(keys);
        await this._removeCache(keys)
    }
    
    _parseKeyArray(params){
        var inquiry = this._inquiry;
        return ArrayUtil.parse(params,(param)=>{
            return inquiry.acqDataCode(param)
        })
    }
    
    setKey(key){
        this._key = key;
    }
    
    async saveArray(opts,dbs){
        var inquiry = this._inquiry 
        var map = ArrayUtil.toMapArray(dbs,data=>inquiry.acqDataCode(data));
        for(var opt of opts){
            var key = inquiry.acqCode(opt);
            var val = map[key];
            if(val == null)
                val = [];
            await this.save(key,val);
        }
    }
    async onlySaveArray(dbs){
        var inquiry = this._inquiry 
        var map = ArrayUtil.toMapArray(dbs,data=>inquiry.acqDataCode(data));
        for(var key in map){
            var val = map[key];
            await this.save(key,val);
        }
    }
    
    
      /**
      返回结果
      {
        ret, //从缓存中查出的结果
        list //从缓存中找不到的key值
      }  
      */
    async find(optArray):Promise<FindResult>{
        var array = await this.keyArray();
        var hasArray = ArrayUtil.and(optArray, array)
        var ret = await this._find(hasArray);
        var notArray = ArrayUtil.notIn(optArray, array)
        return {
            ret,
            list:notArray
        }
    }
    
    async _find(hasArray){
        var ret = []
        for (var i = 0; i < hasArray.length; i++) {
            var key = hasArray[i]
            ArrayUtil.addAll(ret, await this.get(key))
        }
        return ret;
    }
    _acqKey(){
        
        return this._key
    }
  
}

import {Context,ArrayUtil} from 'itachi_util'
import BaseInquiry from '../BaseInquiry';







