import OnChangeOpt from '../OnChangeOpt'
export default class DefOnChangeOpt implements OnChangeOpt{
    private _opt:OnChangeOpt;
    
    constructor(opt:OnChangeOpt){
        this._opt  = opt;
    }

    async onAdd(dao:any,obj:any):Promise<void>{
        if(this._opt.onAdd){
            await this._opt.onAdd(dao,obj)
        }
    }
    async afterAdd(dao:any,obj:any):Promise<void>{
        if(this._opt.afterAdd){
            await this._opt.afterAdd(dao,obj)
        }
    }

    async onUpdate(dao:any,obj:any,opts?):Promise<void>{
        if(this._opt.onUpdate){
            await this._opt.onUpdate(dao,obj,opts)
        }
    }
    async afterUpdate(dao:any,cnt:number,obj:any,opts?):Promise<void>{
        if(this._opt.afterUpdate){
            await this._opt.afterUpdate(dao,cnt,obj,opts)
        }
    }

    async onDel?(dao:any,obj, opts?):Promise<void>{
        if(this._opt.onDel){
            await this._opt.onDel(dao,obj,opts)
        }
    }

    async afterDel?(dao:any,cnt:number,obj, opts?):Promise<void>{
        if(this._opt.afterDel){
            await this._opt.afterDel(dao,cnt,obj,opts)
        }
    }

    async onAddArray?(dao:any,arr: object[]):Promise<void>{
        let opt = this._opt;
        let onAddArray = opt.onAddArray;
        if(onAddArray==null && opt.onAdd != null){
            onAddArray = async function(dao:any,array:object[]):Promise<void>{
                for(let obj of array){
                    await opt.onAdd(dao,obj);
                }
            }
        }
        if(onAddArray != null)
            await onAddArray(dao,arr)
      
    }
    async afterAddArray?(dao:any,arr: object[]):Promise<void>{
        let opt = this._opt;
        let afterAddArray = opt.afterAddArray;
        
        if(afterAddArray != null){
            await afterAddArray(dao,arr)
        }
    }

    async onUpdateArray?(dao:any,array: Array<any>, other?: object,whereObj?:any): Promise<void>{
        let opt = this._opt;
        let onUpdateArray = opt.onUpdateArray;
        if(onUpdateArray==null && opt.onUpdate != null){
            onUpdateArray = async function(dao:any,array:object[], other?: object):Promise<void>{
                for(let obj of array){
                    await opt.onUpdate(dao,obj);
                }
            }
        }
        if(onUpdateArray != null){
            await onUpdateArray(dao,array,other,whereObj)
        }
    }
    async afterUpdateArray?(dao:any,cnt:number,array: Array<any>, other?: object): Promise<void>{
        let opt = this._opt;
        let afterUpdateArray = opt.afterUpdateArray;
        
        if(afterUpdateArray != null){
            await afterUpdateArray(dao,cnt,array,other)
        }
    }

    async onDelArray?(dao:any,array: Array<any>, opts?: any): Promise<void>{
        let opt = this._opt;
        let onDelArray = opt.onDelArray;
        if(onDelArray==null && opt.onDel != null){
            onDelArray = async function(dao:any,array:object[], other?: object):Promise<void>{
                for(let obj of array){
                    await opt.onDel(dao,obj);
                }
            }
        }
        if(onDelArray != null){
            await onDelArray(dao,array,opts)
        }
    }
    async afterDelArray?(dao:any,cnt:number,array: Array<any>, opts?: any): Promise<void>{
        let opt = this._opt;
        let afterDelArray = opt.afterDelArray;
        
        if(afterDelArray != null){
            await afterDelArray(dao,cnt,array,opts)
        }
    }
}
