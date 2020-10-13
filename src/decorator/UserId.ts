import { DaoUtil } from "../orm"

/**
 * 在上下文注册builder
 */


interface UserIdOpt{
    add_col?:string,
    update_col?:string,

}
export default  function(opt?:UserIdOpt){
    if(opt == null){
        opt = {add_col:'add_user',update_col:'modify_user'};
    }
    return DaoUtil.createAddAndUpdate({
        addCol:opt.add_col,
        updateCol:opt.update_col,
        processFun:function(dao:any,data){
            let context = dao.getContext();
            if(context != null){
                let token = context.getData('token');
                if(token){
                    return token.user_id;
                }
            }
        }
    })
}

