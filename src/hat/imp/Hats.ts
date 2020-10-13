import {Context} from '@dt/itachi_core'
import BaseHat from '../BaseHat'
import { Hat } from '../../orm';

export default class Hats extends BaseHat{
    getKeys():Array<string>{
        let opt = this._opt;
        return opt.keys
    }
    
    protected getHatsClazz():Array<any>{
        let opt = this._opt;
        return opt.hatsClazz;
    }
    protected getHats(){
        let hatsClazz = this.getHatsClazz();
        let context = this.getContext();
        if(hatsClazz != null){
            return hatsClazz.map((clazz)=>{
                return new clazz({
                    context,
                    fun:this._fun
                })
            })
        }
        let keys = this.getKeys();
        return keys.map((key)=>{
            return new Hat({
                context,
                key,
                fun:this._fun
            })
        })
    }
    async process(list){
        let hats = this.getHats();
        /*
        let array = [];
        for(let hat of hats){
            array.push(hat.process(list));
        }
        await Promise.all(array);*/
        for(let hat of hats){
            await hat.process(list);
        }
        return list;
    }
}