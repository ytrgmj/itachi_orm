export default class DaoOpt{
    _opt:any;
    constructor(opt){
        if(opt==null)
            opt = {};
        this._opt = opt;
    }
    /**
     * 返回表名
     */
    getTableName():string{
        return this._opt.tableName
    }

    /**
     * @returns poolName
     */
    getPoolName(): string {
        return this._opt.poolName
    }
    /**
     * 返回id列表
     */
    acqIds():Array<string>{
        var opt = this._opt;
        if(opt.ids == null)
            return ['id'];
        var ids = opt.ids;
        if(!(ids instanceof Array))
            ids = [ids];
        return ids;
    }
    /**
     * 是否 id
     * @param col 
     */
    isId(col:string):boolean{
        var ids = this.acqIds();
        for(var id of ids){
            if(col == id)
                return true;
        }
        return false;
    }
    /**
     * 是否自增
     */
    isIncrement():boolean{
        var opt = this._opt;
        return opt.increment == null || opt.increment == true;
    }
    /**
     * 返回首个id
     */
    acqFirstId():string{
        var ids = this.acqIds();
        return ids[0]
    }
}