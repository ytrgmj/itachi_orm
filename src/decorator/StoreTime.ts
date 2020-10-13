import { DaoUtil } from "../orm"

/**
 * 在上下文注册builder
 */


interface StoreTimeOpt{
    addCol?:string,
    updateCol?:string
}
export default  function(opt?:StoreTimeOpt){
    if(opt == null){
        opt = {addCol:'add_time'};
    }
    return DaoUtil.createAddAndUpdate({
        addCol:opt.addCol,
        updateCol:opt.updateCol,
        processFun:function(dao:any,data){
            let context = dao.getContext();
            if(context != null){
                let timezoneServer = context.get('timezoneServer');
                if(timezoneServer){
                    return timezoneServer.getDate();
                }
            }
        }
    })
}

