import SqlBuilder from '../SqlBuilder';
import { Sql, ColSql, ValSql, ReturnSql } from '../../../sql';

export default class AddSql extends SqlBuilder {
	build(obj: object, opts?: object): Sql {
		var opt = this._opt;
		let array = new Sql()
		this._pushSqlTxt(array, 'insert into ')
		this._pushSqlTxt(array, opt.getTableName());
		this._pushSqlTxt(array, '(')
		var cnt = 0
		for (let e in obj) {
			if (this._isValidCol(e)) {
				if (cnt++ > 0) {
					this._pushSqlTxt(array, ',')
				}
				this._pushSqlTxt(array, new ColSql(e))
			}
		}
		this._pushSqlTxt(array, ')values(')
		cnt = 0
		for (var e in obj) {
			if (this._isValidCol(e)) {
				if (cnt++ > 0) {
					this._pushSqlTxt(array, ',')
				}

				this._pushSqlTxt(array, new ValSql(obj[e]))
			}
		}
        this._pushSqlTxt(array, ')')
        this._pushSqlTxt(array, new ReturnSql(opt.acqIds()))
		return array
	}

}