/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-03-01 15:50:43
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-03-01 16:16:30
 */
import SqlUtil from './SqlUtil'
import { sqlType, sqlColEscapeCharacter, sqlPlaceHolder } from '../../constant'


export default class PgUtil extends SqlUtil {
    constructor() {
        super()
        this.type = sqlType.pg
        this.escapeCharacter = sqlColEscapeCharacter[this.type]
        this.placeHolder = sqlPlaceHolder[this.type]
    }

    escapeParameters(count: object):string {
        return this.placeHolder + `${++count['pgCount']}` 
    }

    returnStr(cols: string[]): string {
        cols = cols.map(col => this.escapeId(col))
        return `returning ${cols.join(',')}`
    }

    /**
     * @description node
     * @param val
     */
    valTypeToPgType (val: any): string {
        // if (val instanceof Date) return 'date'
        let type: string = typeof val
        switch (type) {
            case 'object':
                type = this.objectToPgType(val)
                break;
            case 'number':
                if (!Number.isInteger(val)) {
                    type = 'float'
                } else {
                    type = 'int'
                }
                break
            case 'bigint':
            case 'boolean':
                break
            case 'string':
                type = 'text'
                break
            default:
                // symbol function undefined
                throw new Error(`PgUtil: Unverifiable data ${ val }, type is ${ type }`)

        }
        return type
    }

    /**
     * @description 针对 typeof 为 object 的数据
     * @param val
     */
    objectToPgType (val: object): string {
        if (val === null) return ''
        if (val instanceof Date) return 'timestamptz'
        if (val instanceof Array) { // 多维数组: [1,2,3] => int[], [['1', 'sdf']] => text[][]
            return this.arrayToPgType(val)
        }
        if (val instanceof Buffer) return 'bytea'
        if (val.constructor === ({}).constructor) return 'json'
        throw new Error(`PgUtil: Not support this type: ${val}`)
    }

    arrayToPgType (val: any[]) {
        let { type, level } = this._arrayLevelAndType(val)

        return `${type}${new Array(level).fill('[]').join('')}`
    }

    /**
     * @description 多维数组, 且数组内数据同一类型
     * @param val <Array>
     * @param level: 默认一维数组
     * @returns { type: 数据类型, level: 数组层级}
     */
    private _arrayLevelAndType(val: any[], level:number = 1): { type: string, level: number } {
        let type = 'text'
        if (val[0] instanceof Array) { // 如果多维, 第一个必然是数组
            return this._arrayLevelAndType(val[0], ++level)
        } else { // 第一个不是数组, 必然不是多维数组, 且数组内所有数据同一类型
            type = this.valTypeToPgType(val[0])
        }

        return { type, level }
    }

}