import Sql from "../../sql/Sql";
import Builder from '../Builder';
import _ from 'lodash'

export default abstract class SqlBuilder extends Builder {

    protected _pushSqlTxt(sql: Sql, str: string | Sql, val?: any) {
        if (str['clazz']== 'Sql') {
            sql.add(str);
        } else {
            sql.add(new Sql(<string>str, val))
        }
    }

    protected _isValidCol(col: string): boolean {
        return col.substring(0, 1) != '_';
    }

    protected _need(name: string): Boolean {
        return (name.substring(0, 1) === '_') ? false : true
    }

    protected _findCols(dataArray: object[]): any[] {
        const map = {}
        for (let i = 0; i < dataArray.length; i++) {
            const data = dataArray[i]
            for (let e in data) {
                map[e] = true
            }
        }
        // var map = dataArray[0];
        const array = []
        for (let e in map) {
            if (this._need(e)) {
                array.push(e)
            }
        }
        return array
    }

}