import BaseCdt from './BaseCdt'
import Cdt from './imp/Cdt'
import IsNullCdt from './imp/IsNullCdt'
import IsNotNullCdt from './imp/IsNotNullCdt'
import Sql from '../../sql/Sql'

export default abstract class  ArrayCdt extends BaseCdt{
    protected _array:Array<BaseCdt>=[];

	

	addCdt (baseCdt:BaseCdt):ArrayCdt{
		if(baseCdt){
			this._array.push(baseCdt)
		}
		return this;
	}
    /**
	 * 增加相等条件
	 * @param col 字段
	 * @param val 值
	 */
	eq(col:string, val):ArrayCdt {
		return this.addCdt(new Cdt(col, val))
	}
	/**
	 * 增加 in 查询
	 * @param col 字段
	 * @param val 查询数组
	 */
	in(col:string, val:Array<any>):ArrayCdt {
		
		return this.addCdt(new Cdt(col, val, 'in'))
	}
	/**
	 * 增加 in 查询
	 * @param col 字段
	 * @param val 查询数组
	 */
	notIn(col, val):ArrayCdt {
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
	like(col:string, val):ArrayCdt {
		return this.addCdt(new Cdt(col, val, 'like'))
	}
	/**
	 * 增加 大于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	big(col:string, val):ArrayCdt {
		return this.addCdt(new Cdt(col, val, '>'))
	}
	/**
	 * 增加 大于等于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	bigEq(col:string, val):ArrayCdt {
		return this.addCdt(new Cdt(col, val, '>='))
	}
	/**
	 * 增加 小于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	less(col:string, val):ArrayCdt {
		return this.addCdt(new Cdt(col, val, '<'))
	}
	/**
	 * 增加 小于等于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	lessEq(col:string, val):ArrayCdt {
		return this.addCdt(new Cdt(col, val, '<='))
	}
	/**
	 * 增加 不等于 查询
	 * @param col 字段
	 * @param val 查询值
	 */
	notEq(col:string, val):ArrayCdt {
		return this.addCdt(new Cdt(col, val, '!='))
	}
	
	/**
	 * 增加 为空 查询
	 * @param col 字段
	 */
	isNull(col:string):ArrayCdt {
		this.addCdt(new IsNullCdt(col))
		return this
	}
	/**
	 * 增加 不为空 查询
	 * @param col 字段
	 */
	isNotNull(col:string):ArrayCdt {
		this.addCdt(new IsNotNullCdt(col))
		return this
	}

	protected toSqlStr(str):Sql{

		let sql = new Sql('(')
		var array = this._array;
		if(array.length==0)
			return null;
		for(var i=0;i<array.length;i++){
			var cdt = array[i]
			if(i>0){
				sql.add(' ')
					.add(str)
					.add(' ')
			}
			sql.add(cdt.toSql());
		}
		sql.add(')')
		return sql;
	}
}