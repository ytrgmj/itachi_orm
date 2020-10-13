import Query from './query/Query';
import IExecutor from './executor/IExecutor'
import Builder from './builder/Builder';
import DaoOpt from './opt/DaoOpt';

import _ from 'lodash'
import { BeanUtil, ArrayUtil,Context } from '@dt/itachi_core'
import { onlyArrayIntface, AnyObject, onlyDataInterface } from '../interface'

export default abstract class Dao {
    protected _opt: DaoOpt;
    protected _map: object;
    protected _context:Context;

    
    /**
     * 根据一个查询条件，进行更新
     * @param whereCdt 查询条件
     * @param data  //更新数据
     */
    async updateByCdt(whereCdt,data){
        this._checkNullCdt(whereCdt);
        let idCol = this._opt.acqFirstId();
        let list = await this.findCol(whereCdt,idCol);
        list = list.map(id=>({[idCol]:id}))
        
        return await this.updateArray(list,data,whereCdt);
    }

    /**
     * 根据一个查询条件，进行删除
     * @param cdt 
     * @param data 
     */
    async delByCdt(cdt){
        this._checkNullCdt(cdt);
        let idCol = this._opt.acqFirstId();
        let list = await this.findCol(cdt,idCol);
        list = list.map(id=>({[idCol]:id}))
        return await this.delArray(list,cdt);
    }

    protected _checkNullCdt(cdt){
        if(cdt == null)
            
        if(cdt.clazz == 'BaseCdt') //BaseCdt 没办法检测条件
            return;
        let cnt = 0;
        for(var e in cdt){
            if(cdt[e]== null){
                throw new Error(`条件的${e}为空`);
            }
            cnt ++;
        }
        if(cnt == 0)
            throw new Error('不能传空的条件');
        
    }
    getTableName(){
        return this._opt.getTableName();
    }

    setContext(context:Context){
        this._context = context;
    }
    getContext(){
        return this._context;
    }
    constructor(opt) {
        
        this._opt = new DaoOpt(opt);
    }

    /**
     * 根据主键判断有或者没有
     * @param data 
     */
    async save(data,whereObj?){
        if(data == null)
            return 
        let id = data[this._opt.acqFirstId()]
        if(id == null){
            await this.add(data)
        }else{
            await this.update(data,whereObj);
        }
        return data;
    }
    /**
     *
     * 增加一条数据
     * @param obj 数据
     */
    async add(obj: object): Promise<any> {
        if (!obj || typeof obj !== 'object' || !Object.keys(obj)) return {}
        var result = await this._execute('add', _.cloneDeep(obj))
        var opt = this._opt;
        if (result.insertId && opt.isIncrement()) {
            obj[opt.acqFirstId()] = result.insertId;
        }
        return obj
    }

    /**
     * @description 增加一组数据
     * @param arr objectp[]
     */
    async addArray(arr: object[]): Promise<object[]> {
        if (!arr || arr.length == 0) return
        const result = await this._execute('addArray', _.cloneDeep(arr))
        const opt = this._opt
        if (result.insertId && opt.isIncrement()) {
            const idName = opt.acqFirstId()
            for (let obj of arr) {
                obj[idName] = result.insertId++
            }
        }
        return arr
    }
    /**
     * 修改一条数据
     * 返回值，更改数量，0/1
     * @param obj  数据
     * @param whereObj 其他条件
     *
     */
    async update(obj, whereObj?): Promise<number> {


        var ret = await this._execute('update', obj, whereObj)
        return ret.affectedRows;
    };

    /**
     * 更新一个数组
     * @param array
     */
    async updateArray(array: Array<any>, other?: object,whereObj?:any): Promise<number> {
        if (!array || array.length == 0) return
        if (array.length == 1 && other == null) {
            return this.update(array[0],whereObj)
        }
        const res = await this._execute('updateArray', array, {other,whereObj})
        return res.affectedRows
    }

    /**
     *删除一条数据 
     * @param obj 
     * @param opts 
     */
    async del(obj, opts?): Promise<number> {
        var ret = await this._execute('del', obj, opts)
        return ret.affectedRows;
    }

    /**
     * 删除一个数组
     * @param array 
     */
    async delArray(array: Array<any>, opts?: any): Promise<number> {
        if (!array || !array.length) return 0;
        const res = await this._execute('delArray', array, opts)
        return res.affectedRows
    }
    /**
     * 这个方法 不会相应DaoUtil 的 事件
     * @param query 
     */
    async delByQuery(query):Promise<number>{
        query = Query.parse(query);
        var ret = await this._execute('delByQuery', query)
        return ret.affectedRows;
    }
    /**
     * 查询
     * @param query 可以是个结构体，可以是个Cdt，可以是个Query 
     */
    async find(query): Promise<Array<any>> {

        const ret = await this._query('find', query)
        return ret
    }
    /**
     * 查询数量
     * @param query  可以是个结构体，可以是个Cdt，可以是个Query
     */
    async findCnt(query): Promise<number> {
        let array = await this._execute('findCnt', query)
        if (array.length == 0)
            return 0;
        return array[0].cnt
    }
    /**
     * 查询单条数据
     * @param query  可以是个结构体，可以是个Cdt，可以是个Query
     */
    async findOne(query): Promise<any> {
        var array = await this._execute('findOne', query)

        if (array.length == 0)
            return null;
        return array[0]
    }
    /**
     * 根据id查询一条数据
     * @param id 
     */
    async getById(id: string | number | object): Promise<any> {
        const res = await this._execute('findById', id)
        if (!res || !res.length) return null
        return res[0]
    }
    /**
     * 根据id数组查询一批数据
     * @param ids
     * @key 特定 key (findByKeys)
     * @col 单独列, distinct 数据
     */
    async findByIds(ids: Array<string | number>, key?: string, col?: string): Promise<Array<any>> {
        if (!ids || !ids.length) return []
        if (!key) key = this._opt.acqFirstId();
        var query = new Query()
        query.in(key, ids)
        if (col != null) {
            let ret = await this._findCol(query, col)
            return ret
        }
        let ret = await this.find(query)
        return ret
    }

    async onlyArray (opt: onlyArrayIntface): Promise<any> {
        if (!opt || typeof opt != 'object') throw new Error('OnlyArray: need a object')
        if (!opt.query && !opt.finds) throw new Error('OnlyArray: choose one from query and finds')
        let idCol = this._opt.acqFirstId();
        let sortFun = opt.sortFun || ((obj1, obj2) => obj1[idCol] - obj2[idCol])

		let checkUpdate = opt.checkUpdate || (
            (oldData, data) => !BeanUtil.checkIgnore(oldData, data)
        )
		let self = this;
		const find = async (opt) => {
			if (opt.finds)
				return await opt.finds();
			else
				return await self.find(opt.query);
        }

        let list = await find(opt);

		let mapFun = opt.mapFun
		if (mapFun == null) {
			throw new Error('没有给出map的函数')
		}
        let array = opt.array;
        if(array == null && opt.data  != null){
            array = [opt.data];
        }
		if (array == null  ) {
			//throw new Error(this.acq('tableName') + ' 更新的数据为空');
			return [];
		}
		var arrayMap = ArrayUtil.toMapByKey(array, mapFun)
		let listMap = ArrayUtil.toMapArray(list, mapFun)
		let hasDelData = false;
		for (let e in listMap) {
			var datas = listMap[e]
			if (datas.length > 1) {
				hasDelData = true;
				datas.sort(sortFun);
			}
			listMap[e] = datas[0];
		}
		
		var needAdd = []
		var needUpdate = []
		var needDel = []

		function pushAdd(e, data) {
			if (data == null) {
				return null
			}
			if (opt.addFun) {
				var addFunRet = opt.addFun(data)
				if (addFunRet != null) {
					data = addFunRet
				}
            }
			
			needAdd.push(data)
		}

		function pushUpdate(e, data, oldData) {
			if (data == null) {
				return null
			}
			if (opt.updateFun) {
				var updateFunRet = opt.updateFun(data)
				if (updateFunRet != null) {
					data = updateFunRet
				}
			}
			

			if (checkUpdate(oldData, data)) {
                data = BeanUtil.shallowClone(data);
				data[idCol] = oldData[idCol]

				if (opt.beforeUpdate) {
					var beforeUpdateRet = opt.beforeUpdate(data, oldData)
					if (beforeUpdateRet != null) {
						data = beforeUpdateRet;
					}
				}
				needUpdate.push(data)
			}
		}
		for (let e in arrayMap) {
			var oldData = listMap[e]
			var data = arrayMap[e]
			if (oldData == null) {
				if (!opt.noAdd) pushAdd(e, data)
			} else {
				if (opt.needUpdate) {
					if (opt.isUpdate == null || (await opt.isUpdate(data, oldData))) {
						pushUpdate(e, data, oldData)
					}
				}
			}
		}
		var delArray = [];
		if (opt.needDel) {
			delArray = ArrayUtil.notInByKey(list, array, mapFun);
			if (opt.delFun) {
				delArray = ArrayUtil.parse(delArray, opt.delFun);
			}
			if (opt.dels == null) {
				await this.delArray(delArray);
			} else {
				await opt.dels(delArray);
			}
		}
		if (needAdd.length == 0 &&
			needUpdate.length == 0 &&
			!hasDelData &&
			delArray.length == 0) {
			return list
        }
        let addedArray = null
		if (opt.adds) {
			addedArray = await opt.adds(needAdd);
		} else {
            
			addedArray =await this.addArray(needAdd);
		}
		if (opt.updates) {
			await opt.updates(needUpdate);
		} else {
            await this.updateArray(needUpdate)
		}
		if (opt.afterFun) {
			await opt.afterFun();
		}
		if (!opt.noLastFind) {
			list = await find(opt);
			var arrayMap = ArrayUtil.toMapArray(list, mapFun)
			var ret = []
			for (let e in arrayMap) {
				var mapArray = arrayMap[e]
				if (mapArray.length == 1) {
					ret.push(mapArray[0])
				}
				if (mapArray.length > 1) {
					mapArray.sort(sortFun)
					ret.push(mapArray[0])
					ArrayUtil.addAll(needDel, mapArray.slice(1))
				}
			}
			if (!opt.noDel){
                if(addedArray != null){
                    let delAddArray = ArrayUtil.andByKey(addedArray,delArray,idCol);
                    
                    for(let row of delAddArray){
                        delete row[idCol];
                    }
                }
				if(opt.dels == null){
					await this.delArray(needDel);
                }else{
                    await opt.dels(needDel);
                }
			}
			return ret
		}
	}

    /**
	 * 只查询某一列 distinct col
	 * @param {[type]} query         [description]
	 * @param {[type]} col           [description]
	 * @yield {[type]} [description]
	 */
    protected async _findCol(query: Query, col: string) {
        if (!col) col = this._opt.acqFirstId();
        query = this._parseQuery(query)
        query.col('distinct ' + col)
        var list = await this.find(query)
        return list.map(_data => _data[col])
    }

    /**
     * 查询某一列
     * @param query 
     * @param col 
     */
    async findCol(query,col:string){
        const ret = this._findCol(query, col)
        return ret
    }

    async findOneCol(query,col?){
        var schQuery = Query.parse(query);
        schQuery.size(1);
        var ret = await this.findCol(schQuery,col);
        if(ret.length == 0)
            return null;
        return ret[0]
    }

    protected _parseQuery(query: any) {
        return Query.parse(query);
    }

    /**
     * data可空
     * opt.query 查询条件
     * opt.noSch default false, 直接查询, 返回 opt.fun (sortFun) 第一条
     * opt.sortFun
     * opt.data 当 nosch: true, 不需要先查询时，插入 data, 再查询 query
     * 若仅新增一条, 即返回；若 sortFun 后，第一条不是该新增, 则返回第一条, 删除新增
     * @param opt AnyObject
     */
    async onlyData(opt: onlyDataInterface) {
        if (!opt) return null
        if (!opt.query) return null

		let query = opt.query
		let fun = opt.fun
		let data = opt.data || {}
		let noSch = opt.noSch
        let self = this

        if (typeof query === 'object' && !(query.clazz == 'Query')){
            let _queryObj = Object.assign({}, query)
            data = BeanUtil.combine(_queryObj, data)
            query = new Query()
            for (let [k, v] of Object.entries(_queryObj)) query.eq(k, v)
        }

		async function sch() {
			var list = await self.find(query)

			return self._delOther(list, fun)
        }

		var ret = null
		if (!noSch) {
			ret = await sch()
			if (ret) return ret
		}
		var ret = await this.add(data)
		return sch()
    }

    /**
     * @description list 数组排序后, 只取第一条, 删除剩余数据
     * @param list
     * @param sortFun
     * @param delId
     */
    protected async _delOther(
        list: AnyObject[],
        sortFun?: (obj1?: AnyObject, obj2?: AnyObject) => number
       
    ){
        let idCol = this._opt.acqFirstId()
        if (!sortFun) {
			sortFun = (obj1, obj2) => obj1[idCol] - obj2[idCol]
        }
        if (!list || !list.length) return null
        if (list.length == 1) return list[0]

        
		list.sort(sortFun)
        const ret = list[0]

        let delArray = list.slice(1);
        await this.delArray(delArray);

		return ret
    }

    /**
     * 返回sql的map
     * map 结构{key:class}
     */
    protected _acqMap() {
        if (this._map == null) {
            this._map = this._initMap();
        }
        return this._map;
    }

    protected abstract _initMap();

    protected async _execute(key: string, obj: any, opts?: any): Promise<any> {
        let executor = this._acqExecutor();
        let builder = this._acqBuilder(key);
        return await executor.execute(builder.build(obj, opts));
    }

    protected async _query(key: string, obj: any, opts?: any): Promise<any> {
        let executor = this._acqExecutor();
        let builder = this._acqBuilder(key);
        return await executor.query(builder.build(obj, opts));
    }

    /**
     * 返回sql的执行器，每个数据库重写
     */
    protected abstract _acqExecutor(): IExecutor;

    /**
     * 返回
     * @param key 操作，类似add ,update
     */
    protected _acqBuilder(key: string): Builder {
        let opt = this._opt;
        let map = this._acqMap();
        let Clazz = map[key];
        if (Clazz == null)
            return null;
        return new Clazz(opt);
    }

}