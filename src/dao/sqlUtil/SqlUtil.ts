/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-03-01 15:50:54
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-03-01 16:14:09
 */
import { sqlColEscapeCharacter, sqlType, sqlPlaceHolder } from '../../constant'

export default abstract class SqlUtil {
    protected escapeCharacter: string
    protected placeHolder: string
    protected type: string

    escapeId(col: string = '') {
        if (col.indexOf(this.escapeCharacter) != -1) col = '' // 包含转义即认为 sql 注入

        col = col.split('.') // 针对 table.id 形式处理
            .map(_col => [ this.escapeCharacter, _col, this.escapeCharacter ].join(''))
            .join('.')
        return col
    }

    /**
     * @description 参数化处理, 占位符
     */
    abstract escapeParameters(count?: object): string

    abstract returnStr(cols: string[]): string
}