
import {BeanUtil, ArrayUtil, Context} from 'itachi_core'
import { Dao ,Query, BaseCdt} from '../orm';



interface SyncDataOpt{
    context :Context;
    /**
     * 表格名称
     */
    tableName:string;
    /**
     * 同步的字段 ，默认sort is_del name
     */
    cols?:Array<string>;
    /**
     * 当前level 默认为brand
     */
    level?:string
    /**
     * 其他条件
     */
    otherCdt?:any
    /**
     * 不需要搜索level
     */
    noNeedSchLevel?:any
}
/**
 * 用于同步数据，将level=brand 的数据同步到其他级别下
 */
export default class SyncData{
    
    _opt:SyncDataOpt;
    constructor(opt:SyncDataOpt){
        this._opt = opt;
    }

    getLevel(){
        let level = this._opt.level;
        if(level == null)
            level = 'brand';
        return level;
    }

    noNeedSchLevel():boolean{
        let noNeedSchLevel = this._opt.noNeedSchLevel;
        return noNeedSchLevel != null;
    }

    async buildQuery(list:Array<any>):Promise<Query>{
        let query = new Query();
        let noCol = this.getNoCol();
        query.in(noCol,ArrayUtil.toArray(list,noCol));
        query.eq('is_del',0)
        if(!this.noNeedSchLevel())
            query.notEq('level',this.getLevel())
        let otherCdt = this._opt.otherCdt
        if(otherCdt){
            query.addCdt(BaseCdt.parse(otherCdt));
        }
        return query;
    }

    async _find(list:Array<any>):Promise<Array<any>>{
        let dao = this.getDao();
        let query = await this.buildQuery(list);
        return await dao.find(query);

    }
    async syncData(list:Array<any>){
        if(list == null || list.length==0)
            return;
        let array = await  this._find(list);
        if(array.length == 0)
            return;
        
        let dao = this.getDao();
        let self = this;
       
        let idCol = this.getIdCol();
        let datas = ArrayUtil.joinArray({
            key:this.getNoCol(),
            list,
            list2:array,
            fun(data,list2Array){
                let retArray = [];
                let cols = self.getCols();
                for(let row of list2Array){
                    if(!self.isSame(row,data)){
                        let updateData = {}
                        for(let col of cols){
                            updateData[col] = data[col];
                        }
                        updateData[idCol] = row[idCol];
                        retArray.push(updateData);
                    }
                }
                return retArray;
            }
        })
        await dao.updateArray(datas);
    }
    getTableName(){
        return this._opt.tableName;
    }

    protected getDao():Dao{
        let context = this._opt.context;
        return context.get(this.getTableName()+'dao')
    }
    
    protected getNoCol():string{

        return this.getTableName()+'_no';
    }

    protected getIdCol():string{
        return this.getTableName()+'_id';
    }

    
    protected isSame(data,data1):boolean{
        return BeanUtil.isEqual(data,data1,this.getCols());
    }

    protected getCols():Array<string>{
        let opt = this._opt;
        let cols = opt.cols;
        if(cols == null)
            cols = ['sort','name','is_del']
        return cols;
    }

    






}