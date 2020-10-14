import { Bean ,Context} from "itachi_core";

export default class TransManager {
    private _context:Context;

    setContext(context:Context){
        this._context = context;
    }
    @Bean('DbTrans')
    private _map:Map<string,any>;
    private _transNum:number = 0;

    getTransNum():number{
        return this._transNum;
    }
    /**
     * 开始事物
     */
    async beginTran(){
        let map = this._map;
        for(let trans of map.values()){
            await trans.beginTran();
        }
        this._printLog('开始事务');
        this._transNum ++;
    }
    /**
     * 
     * 提交事务
     */
    async commitTran(){
        this._transNum --;
        let map = this._map;
        for(let trans of map.values()){
            await trans.commitTran();
        }
        this._printLog('提交事务');
        

    }
    /**
     * 回滚
     */
    async rollbackTran(){
        this._transNum --;
        let map = this._map;
        for(let trans of map.values()){
            await trans.rollbackTran();
        }
        this._printLog('回滚事务');
        
    }

    private _printLog(msg:string){
        let logger = this._context.getLogger();
        logger.debug(msg);
    }

}