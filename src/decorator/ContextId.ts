import { DaoUtil } from "../orm"

/**
 * 在上下文注册builder
 */


interface ContextIdOpt{
    col:string
}
export default  function(opt?:ContextIdOpt){
    if(opt == null){
        opt = {col:'context_id'};
    }
    return DaoUtil.createAddAndUpdate({
     
        updateCol:opt.col,
        processFun:function(dao:any,data){
            let context = dao.getContext();
            if(context != null){
                
                
                return context.getId();
            }
        }
    })
}

