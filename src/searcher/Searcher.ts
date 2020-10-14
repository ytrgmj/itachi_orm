import {Context} from 'itachi_util'

export default abstract class  Searcher{
    

    protected _map = {};

    protected _context:Context;
    

    /**
     * 出事化，注册inquiry
     * @param context 
     */
    protected abstract init(context:Context);

    /**
     * 返回表格名
     */
    protected abstract getKey():string;

    setContext(context:Context){
        this._context = context;
    }

    getContext():Context{
        return this._context;
    }
    protected getIdKey(){
        return this.getKey() + '_id';
    }

    protected getNoKey(){
        return this.getKey() + '_no';
    }

    afterBuild(context:Context){
        
        this.reg('getById',new Inquiry({
            col:this.getIdKey()
        }));

        
        this.init(context);
        
        var map = this._map;
        for(var e in map){
            let inquiry:BaseInquiry = map[e];
            inquiry.setKey(this.getKey()); 
            inquiry.setContext(this._context);
        }
    }
    /**
     * 注册key
     * @param inquiryKey 
     * @param inquiry 
     */
    reg(inquiryKey:string,inquiry:BaseInquiry){
        inquiry.setSchColsOnReg(this.getSchCols());
        this._map[inquiryKey] = inquiry
    }

    protected getSchCols():Array<string>{
        return null;
    }

    _getAll():Array<BaseInquiry> {
        var array = []
        for (var e in this._map) {
            var inquiry = this._map[e]
            if (inquiry) {
                array.push(inquiry)
            }
        }
        return array
    }
    async save(key:string, array:Array<any>) {
        var inquiry = this.get(key)
        if (inquiry) {
          await inquiry.save(array)
        }
    }
    get(key):BaseInquiry {
        return this._map[key]
    }
    async saveAll(array:Array<any>) {
        var list = this._getAll()
        for (var i = 0; i < list.length; i++) {
          if (list[i].couldSaveAll()) {
            await list[i].save(array)
          }
        }
      // list.forEach(obj=>obj.save(array));
    }
    /**
     * 清空缓存，对于多表查询可能无效
     */
    clearCache() {
    
        var list = this._getAll()
        for (var i = 0; i < list.length; i++) {
            list[i].clearCache();
        }
      
    }
    /**
     * 根据ids 列表查询多条记录
     * @param array 
     */
    async findByIds(array:Array<any>):Promise<Array<any>>{
        var inquiry = this.get('getById')
        return await inquiry.find(array)
    }

  

    async getById(id){
        if(id == null)
            return null;
        
        var list = await this.findByIds([id])
        return list[0]
    }

   
}
import Inquiry from './inquiry/imp/Inquiry'

import BaseInquiry from './inquiry/BaseInquiry'


