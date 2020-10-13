import Sql from './Sql'
import SqlUtilFactory from './SqlUtilFactory'


export default class ReturnSql extends Sql {
    protected cols: string[]

    /**
     * @description 返回指定列
     * @param cols
     */
    constructor(cols: string | string[] = []){
        super()
        this.cols = this._colsToArray(cols)
    }

    toSql(type: string): string {
        if (!this.cols.length) return ''
        let sqlUtil = new SqlUtilFactory().get(type)
        return sqlUtil.returnStr(this.cols)
    }

    toVal(): null {
        return null
    }

    /**
     * @description
     * @param col
     */
    add(col: string | ReturnSql ): ReturnSql {
        return this;
    }
}