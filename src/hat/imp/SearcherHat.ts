import Hat from './Hat'
import { Searcher } from '../../orm';
/**
 * 直接从searcher查询的一个hat
 * 构造函数 {
 *  key:'store' ,//指定searcher
 *  needOne:true|false //是否只查询一条记录
 *  funName:string // 查询的方法名
 *  dataCol:string //主表查询的字段，
 * }
 */
export default class SearcherHat extends Hat{
    
    protected _parseListToParam(list){
        var array = [];
        for(var data of list){
            array.push(this._parseData(data))
        }
        return array
    }

    protected _parseData(data){
        var opt = this._opt;
        if(opt.dataCol){
            return data[opt.dataCol];
        }
        return data;
    }

    protected async _schMap(list:Array<any>):Promise<any>{
        if(list.length == 0)
            return {};
        var opt = this._opt;
        var searcher:Searcher = this.getSearcher();
        var funName = opt.funName;
        var params = this._parseListToParam(list)
        //导入searcher缓存
        let retList = await searcher.get(funName).find(params);
        await this._afterSearch(params,retList);
        return {};
    }
    protected async _acqHatData(data,map){
        var opt = this._opt
        var funName = opt.funName;
        
        var searcher:Searcher = this.getSearcher();
        var list = await searcher.get(funName).find(this._parseData( data));

        var opt = this._opt;
        if(opt.needOne){
            return list[0];
        }
        return list;
    }

    async _afterSearch(params:Array<any>,retList:Array<any>){
        
    }
    protected _processData(data,hatData){
        var opt = this._opt;
        if(opt.needOne){
            data._data = hatData
        }else{
            data._array = hatData;
        }
    }

}