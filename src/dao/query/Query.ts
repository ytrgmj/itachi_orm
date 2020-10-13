
/**
 * 查询条件的封装
 */

export default class Query {
	clazz:string = 'Query';
	private _colArray: Array<string> = [];
	private _cols:Array<Col> = null;
	private _groupArray:Array<Col> = null;
	private _havingColArray: Array<Cdt> = [];
	private _havingCol:Array<Col> = null;
	private _groupColArray: Array<string> = [];
	private _joinTables: Array<JoinTable> = [];
	private _cdtArray: Array<BaseCdt> = []
	private _orders: Array<OrderItem> = [];
	private _pager: any = {};
	private _noResult: boolean = false;
	private _forUpdate: boolean = false;

	isHit(row) {
		if (row == null) {
			return false;
		}
		var cdts = this.getCdts();
		if (cdts == null) return true;

		for (var cdt of cdts) {
			if (cdt.isHit != null && !cdt.isHit(row)) {
				return false
			}
		}
		return true;

	}

	hitList(list:Array<any>){
		return ArrayUtil.filter(list,(row)=>this.isHit(row));
	}
	/**
	 * 查询 肯定没结果
	 * in一个空数组
	 */
	isNoResult(): boolean {
		return this._noResult
	}

	acqCol():Array<Col>{
		if (this._cols == null) {
			var cols = this._colArray
			if (cols != null) {
				var retCol = [];
				for(var col of cols){
					retCol.push(new Col(col));
				}
				this._cols = retCol;
			} else {
				this._cols = []
			}
		}
		return this._cols;
	}

	col(val): Query {
		if (val != null) {
			if (val instanceof Array) {
				this._colArray.push(...val);
			} else {
				val = val.toString();

				this._colArray.push(...val.split(','));

			}
		}
		return this
	}

	getCol(): Array<string> {


		return this._colArray
	}

	/**
	 * 表示该query的col具有聚合列
	 */
	colhasAgg(){
		var cols = this.acqCol();
		if(cols.length == 0){
			return false;
		}
		for (var col of cols) {
			if (col.hasAgg()) {
				return true
			}
		}
		return false
	}
	acqGroupCol():Array<Col> {
		if (this._groupArray == null) {
			var groups = this._groupColArray;
			//groups = ArrayUtil.parse(groups, (data) => new Col(data))
			this._groupArray = [];
			for(var col of this._groupColArray){
				this._groupArray.push(new Col(col));
			}
		}
		return this._groupArray
	}
	acqHavingCols():Array<Col> {
		if (this._havingCol == null) {
			var cols = this._havingColArray
			if (cols != null) {
				/*
				cols = ArrayUtil.parse(cols, (data) => {
					var sql = data.toSql()
					if (sql.sql) {
						sql = sql.sql
					}

					var col = new Col()
					col.parseHavingCol(sql)
					return col
				})*/

				this._havingCol = [];
				for(var cdt of cols){
					var col = new Col();
					col.parseHavingCol(cdt);
					this._havingCol.push(col);
				}
			} else {
				this._havingCol = []
			}
		}

		return this._havingCol
	}


	getGroups(): Array<String> {
		return this._groupColArray
	}
	group(val: string|Array<string>): Query {
		this._groupColArray = []
		if(val instanceof Array){
			this._groupColArray.push(... val);
		}else{
			this._groupColArray.push(...val.split(','));
		}
		return this;
	}
	addGroup(group: string): Query {
		this._groupColArray.push(group);
		return this
	}
	/**
	返回jointable
	*/
	getJoinTables() {
		return this._joinTables
	}

	/**
	 * 关联jointable
	 * @param table 表名或者 一个JoinTable 对象
	 * @param col  主表字段 默认 table_id
	 * @param id  次表主键 默认“id”
	 */
	joinTable(table: string | JoinTable, col?: string, id?: string): Query {
		if (table instanceof JoinTable) {
			this._joinTables.push(table);
		} else {
			this._joinTables.push(new JoinTable(table, col, id));
		}
		return this;
	}



	/**
	返回查询条件
	*/
	getCdts(): Array<BaseCdt> {
		return this._cdtArray;
	}
	/**
	返回查询条件
	*/
	getOrders(): Array<OrderItem> {
		return this._orders;
	}

	order(col: string, desc?: string): Query {
		this._orders = [];
		if (col == null) return this
		return this.addOrder(col, desc)
	}
	/**
	 * 倒排一列
	 * @param col 
	 */
	desc(col: string): Query {
		return this.order(col, 'desc')
	}
	addOrder(col, desc?: string) {

		if (col instanceof Array) {
			this._orders.push(...col);
		} else {
			if (col instanceof OrderItem) {
				this._orders.push(col)
			} else {
				if (col.col) {
					this._orders.push(new OrderItem(col.col, col.desc))
				} else {
					this._orders.push(new OrderItem(col, desc))
				}
			}
		}
		return this
	}

	/**
	返回分页
	*/
	getPager() {
		return this._pager
	}
	/**
	设置长度
	*/
	size(val: number): Query {
		
		this._pager.rp = val;
		
		return this
	}
	/**
	设置初始页
	*/
	first(first: number): Query {
		this._pager.first = first
		return this
	}
	/**
	设置页长 和 第几页
	*/
	setPage(pageth: number, len?: number):Query {

		if (pageth == null) 
			return this;
		if(len == null){
			len = this._pager.rp;
		}
		if(len == null)
			throw new Error('请先设置页长');

		return this.first((pageth - 1) * len)
			.size(len)
	}
	constructor(opts?) {
		if (opts == null)
			return;
		if (opts instanceof Array) {
			this.ctor_array(opts)
		}else{
			this.ctor_map(opts)
			
		}
	}
	addHaving(cdt: Cdt) {
		if (cdt == null)
			return this;
		this._havingColArray.push(cdt);
		return this
	}

	getHaving() {
		return this._havingColArray
	}
	/**
	 * 增加查询条件
	 * @param cdt 查询条件|数组
	 */
	addCdt(cdt: BaseCdt | Array<Cdt>) {
		if (cdt == null) return this;


		if (cdt instanceof Array) {
			this._cdtArray.push(...cdt)
		} else {

			this._cdtArray.push(cdt)
		}
		return this
	}

	ctor_map(map) {

		for (var e in map) {
			if (e.substring(0, 1) != '_' && map[e] != null){
				
				this.addCdt(new Cdt(e, map[e]))
			}
		}

	}
	ctor_array(array: Array<Cdt>) {
		this._cdtArray.push(...array);
	}
	/**
	 * 增加相等条件
	 * @param col 字段
	 * @param val 值
	 */
	eq(col: string, val): Query {
		return this.addCdt(new Cdt(col, val))
	}
	/**
	 * 增加 in 查询
	 * @param col 字段
	 * @param val 查询数组
	 */
	in(col: string, val: Array<any>): Query {

		return this.addCdt(new Cdt(col, val, 'in'))
	}
	/**
	 * 增加 in 查询
	 * @param col 字段
	 * @param val 查询数组
	 */
	notIn(col, val): Query {
		if (val == null || val.length == 0) {
			return this;
		}
		return this.addCdt(new Cdt(col, val, 'not in'))
	}
	/**
	 * 增加 like 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	like(col: string, val): Query {
		return this.addCdt(new Cdt(col, val, 'like'))
	}
	/**
	 * 增加 大于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	big(col: string, val): Query {
		return this.addCdt(new Cdt(col, val, '>'))
	}
	/**
	 * 增加 大于等于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	bigEq(col: string, val): Query {
		return this.addCdt(new Cdt(col, val, '>='))
	}
	/**
	 * 增加 小于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	less(col: string, val): Query {
		return this.addCdt(new Cdt(col, val, '<'))
	}
	/**
	 * 增加 小于等于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	lessEq(col: string, val): Query {
		return this.addCdt(new Cdt(col, val, '<='))
	}
	/**
	 * 增加 不等于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	notEq(col: string, val): Query {
		return this.addCdt(new Cdt(col, val, '!='))
	}

	/**
	 * 增加 为空 查询
	 * @param col 字段
	 */
	isNull(col: string): Query {
		this.addCdt(new IsNullCdt(col))
		return this
	}
	/**
	 * 增加 不为空 查询
	 * @param col 字段
	 */
	isNotNull(col: string): Query {
		this.addCdt(new IsNotNullCdt(col))
		return this
	}

	/**
	 * 增加 不等于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	orCdt() {
		var cdt = new OrCdt()
		this.addCdt(cdt)
		return cdt
	}
	andCdt() {
		var cdt = new AndCdt()
		this.addCdt(cdt)
		return cdt
	}
	/**
	 * 查询出来for updat
	 */
	forUpdate(): Query {
		this._forUpdate = true
		return this

	}
	/**
	 * 是否查询出来for update
	 */
	isForUpdate() {
		return this._forUpdate;
	}

	/**
	创建一个查询条件相同的query，
	*/
	cloneSameCdt(): Query {
		var query = new Query(this.getCdts())
		return query
	}


	
	static parse(query):Query{
		if(query == null)
			return new Query();
		if(query.clazz == 'BaseCdt'){
			var ret = new Query();
			ret.addCdt(query);
			return ret;
		}
		if(query.clazz == 'Query')
			return query;
		return new Query(query);
	}



};
import Cdt from './cdt/imp/Cdt'
import JoinTable from './JoinTable'

import OrderItem from './OrderItem' 
import BaseCdt from './cdt/BaseCdt'

import AndCdt from './cdt/imp/AndCdt'
import OrCdt from './cdt/imp/OrCdt'
import IsNullCdt from './cdt/imp/IsNullCdt'
import IsNotNullCdt from './cdt/imp/IsNotNullCdt'
import Col from '../col/Col';
import { ArrayUtil } from '@dt/itachi_core';

