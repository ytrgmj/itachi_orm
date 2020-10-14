import Inquiry from "./Inquiry";
import { Searcher, Query } from "../../../orm";
import { ArrayUtil } from "itachi_core";

export default class ProxyInquiry extends Inquiry{
    couldSaveAll () {
        return false
    }
    
    _couldSave () {
        return false
    }
    async find(param) {
        if(param == null)
            return [];
        if(!(param instanceof Array)){
            param = [param]
        }
        if(param.length == 0)
            return [];
        var context = this.getContext();
        var list;
        var opt = this._opt;
        var searcher:Searcher = context.get(this.getKey()+'searcher');
        if(opt.funName){
           
            var opt = this._opt;
            list = await searcher[opt.funName](param);
        }else{
            
            list = await searcher.findByIds(param);
        }
    
        return await this._filter(list)
    }
    protected async  _filter(list){
        var opt = this._opt;
        if(opt.fun){
            return ArrayUtil.filter(list,opt.fun);
        }
        if(opt.otherCdt){
            let array = []
            var otherCdt = this.acqOtherCdt()
            var query = Query.parse(otherCdt);
            for(let row of list){
                if(query.isHit(row)){
                    array.push(row)
                }
            }
            return array;
           
        }
        return list;
    
    }
}