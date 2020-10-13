
/**
 * 帽子的父类
 */
import {Context} from '@dt/itachi_core'

export default abstract class BaseHat{
    protected _opt:any;
    protected _fun:Function;
    constructor(opt) {
		if (opt == null) {
			opt = {}
		}
		this._opt = opt
		if (opt.fun) {
			this._fun = opt.fun
		}
		
	}
    abstract async process(list:Array<any>):Promise<Array<any>>;

    protected getContext():Context{
		return this._opt.context
    }

    async processOne(row){
        var array = await this.process([row])
		return array[0];
    }
}