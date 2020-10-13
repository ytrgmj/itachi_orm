import { DaoUtil } from "../orm"
import DefOnChangeOpt from "../util/inf/imp/DefOnChangeOpt"

/**
 * 设置排序字段
 */


export default  function(){
    

    
    return DaoUtil.createOnChangeDecorator(new DefOnChangeOpt({
        async onAdd(dao,data){
            if(data && data.sort == null){
                data.sort = new Date().getTime();
            }
        },
        async onAddArray(dao,array:Array<any>){
            if(array){
                let time = new Date().getTime();
                for(let i =0;i<array.length;i++){
                    if(array[i]['sort'] == null)
                        array[i]['sort'] = time+i;
                }
            }
        }
    }))
}

