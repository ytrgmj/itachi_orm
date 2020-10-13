import { DaoUtil } from "../orm"

/**
 * 在上下文注册builder
 */


interface SysTimeOpt{
    addCol?:string
    updateCol?:string
}
export default  function(opt?:SysTimeOpt){
    if(opt == null){
        opt = {addCol:'sys_add_time',updateCol:'sys_modify_time'};
    }
    return DaoUtil.createAddAndUpdate({
        addCol:opt.addCol,
        updateCol:opt.updateCol,
        processFun:function(){
            return new Date();
        }
    })
}

