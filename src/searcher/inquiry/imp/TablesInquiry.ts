
import BaseInquiry from '../BaseInquiry'
import { Searcher } from '../../../orm';

/**
 * 多表查询
 */
export default abstract  class TablesInquiry extends BaseInquiry{

	constructor(opt?){
		super(opt);
	}

    protected _findFromDb(params: any) {
        throw new Error("不需要实现");
    }
    acqDataCode(data: any): string {
        throw new Error("不需要实现");
    }
    acqCode(param: any): string {
        throw new Error("不需要实现");
    }
    
	/**
	子类重写,从另外一个searcher 里面找
	*/
	protected abstract async _findFromOtherSearcher(params);

	protected _getName():string{
		var opt = this._opt;
		return opt.name;
	}

	protected  getSearcher<T>(key:string):T{
		var context = this.getContext();
		return context.get(key+'searcher');
	}



	async  _findArray (params:Array<any>):Promise<Array<any>> {
        if(!(params instanceof Array)){
            params = [params];
        }
		var datas = await this._findFromOtherSearcher(params);
		var list = await this._find(datas, params);
		return await this._addDefData(list, datas);
	}
	async _find(datas, opt) {
		if (datas == null || datas.length == 0)
			return [];
		var context = this.getContext();
		var searcher:Searcher = context.get(this.getKey()+'searcher');
		var opt = this._opt;
		var name = this._getName();
		if (name == null) {
			return await searcher.findByIds(datas);
		} else {
			return await searcher.get(name).find(datas);
		}

	}
	
	


	protected _couldSave():boolean {
		return false;
	}

}