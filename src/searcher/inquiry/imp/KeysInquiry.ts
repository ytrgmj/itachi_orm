import Inquiry from './Inquiry'
import {ArrayUtil, DateUtil} from 'itachi_core'

export default class KeysInquiry extends Inquiry{
    acqColKeys(){
        return this.get('keys');
    }
    _acqCodeByKeys (params) {
        var keys = this.acqColKeys();
        var code:string ;
        var keyFun = this.get('keyFun');
        if(keyFun != null){
            code = keyFun(params);
        }else{
            let opt = this._opt;
            if(keys != null){
                var array = []
                for (var i = 0; i < keys.length; i++) {
                    let val = params[keys[i]];
                    if(val == null){
                        throw new Error(keys[i]+'不存在!!'+JSON.stringify(params)+'的')
                    }
                    if(val instanceof Date){
                        if(opt.onlyDate){
                            val = DateUtil.format(val);
                        }else{
                            val = DateUtil.formatDate(val);
                        }
                    }
                    array.push(val)
                }
                code = array.join('___');
            }
        }
        
        return code.toLowerCase();
    }
    acqCode (params):string {
        var ret = this._acqCodeByKeys(params)
        return ret;
    }
    acqDataCode (data) {
       
        if (!this._checkOtherCdt(data)) {
          return null
        }
        return this._acqCodeByKeys(data)
    }
    protected async _buildCdt  (params) {
        
        var ret = await this._buildArrayCdt(params)
        
        return await this._addOtherCdt(ret)
    }
    private _buildArrayCdt(params) {
        
        return this._buildKeyCdt(params,0);
    }
    private _buildKeyCdt(array,index){
        
        var keys = this.acqColKeys();
        var key = keys[index];
        if(index == keys.length-1){ 
            return new Cdt(key,ArrayUtil.toArrayDis(array,key))
        }else{
            var orCdt = new OrCdt();
            var map = ArrayUtil.toMapArray(array,key)
            for(var e in map){
            var andCdt = new AndCdt();
                andCdt.eq(key,e)
                andCdt.addCdt(this._buildKeyCdt(map[e],index+1))
                orCdt.addCdt(andCdt);
            }
            return orCdt;
        }
        
    }
    
}
import Cdt from '../../../dao/query/cdt/imp/Cdt'
import AndCdt from '../../../dao/query/cdt/imp/AndCdt'
import OrCdt from '../../../dao/query/cdt/imp/OrCdt'
