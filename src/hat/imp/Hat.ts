import BaseHat from "../BaseHat";
import { ArrayUtil } from "@dt/itachi_core";
import { Searcher, Dao } from "../../orm";

/**
 * 跨表/接口 查询类
 * _filterList(list) //过滤条件
 * fun // 处理函数
 *
 * 
 */
// dataXxxx 主表 hatXxx 从表字段
export default class Hat extends BaseHat{
    
    /**
     * 返回从数据中查询的字段名
     */
    protected acqHatCol(row) {
		var opt = this._opt
		if (opt.hatCol) {
			return opt.hatCol
		}
		if(row.name != null)
			return 'name'
		else
			return this.getKey()+'_name';
    }
    /**
	 * 返回给主表的名称
	 */
	protected acqDataName() {
		var opt = this._opt
		if (opt.dataName) {
			return opt.dataName
		}
		var key = this.getKey()
		return key + '_name'
	}
	/**
	返回读取data中的字段
	*/
	protected acqDataCol() {
		var opt = this._opt
		if (opt.dataCol != null) {
			return opt.dataCol
		}
		var key = this.getKey()
		key = key + '_id'
		return key
	}
	protected _acqMapKey(data) {
		return data[this.acqDataCol()]
	}

	
	protected getKey(){
		return this._opt.key
	}
	
	
	protected getDao(key?:string):Dao{
		if (key == null) {
			key = this.getKey()
		}
		return this.getContext().get(key+'Dao')
	}

	protected getSearcher<T>(key?:string):T {
		if (key == null) {
			key = this.getKey()
		}
		return this.getContext().get(key+'searcher')
	}
	
	async process(list:Array<any>):Promise<Array<any>> {
		
		var map = await this._schMap(list);
		
		
		var ret = []
		for (var i = 0; i < list.length; i++) {
			var data = await this._process(list[i], map)
			if (data != null) {
				ret.push(data)
			}
		}
		
		
		return ret
	}
	protected async _schMap(list):Promise<any> {
		list = this._acqIdsFromList(list)
		if (list.length == 0) return {}
		var array = await this._findByIds(list)
		
		let map = this._toMap(array)
		
		return map;
	}
	protected _acqIdsFromList(list:Array<any>) {
		var key = this.acqDataCol()
		var funName = '_filterList'
		if (this[funName]) {
			list = this[funName](list)
		}
		list = ArrayUtil.toArray(list, key)
		list = ArrayUtil.distinct(list)
		return list
	}
	/**
	 * 将查询结果转成map ，方便取值
	 * @param array 
	 */
	protected _toMap(array) {
		if(array.length == 0)
			return {};
		var row = array[0]
		if(row.id == null){
			//数据没有id
			return ArrayUtil.toMapByKey(array, this.getKey()+'_id')
		}else{
			return ArrayUtil.toMapByKey(array, 'id')
		}
	}
	/**
	 * 根据主键从 关联表取数据
	 * @param list 
	 */
	protected async _findByIds(list) {
		var searcher:Searcher = this.getSearcher()
		var array = await searcher.findByIds(list)
		return array
	}
	/**
	 * 从map里面查询关联数据
	 * @param data 
	 * @param map 
	 */
	protected async _acqHatData(data, map) {
		var mapKey = await this._acqMapKey(data)
		if (mapKey == null) {
			return null;
		}
		var hatData = map[mapKey]

		return hatData
	}
	protected async _acqDefData(data) {
		return null
	}
	protected async _process(data, map) {
		var hatData = await this._acqHatData(data, map)
		if (hatData == null) {
			hatData = await this._acqDefData(data)
		}
		if (hatData != null) {
			if (this._fun) {
				await this._fun(data, hatData)
			} else {
				await this._processData(data, hatData)
			}

		} 
		return data
	}

	protected _processData(data, hatData) {
		var key = this.getKey()
		data[this.acqDataName()] = hatData[this.acqHatCol(hatData)]
	}

	
    
}