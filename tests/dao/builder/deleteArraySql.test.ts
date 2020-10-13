/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-28 14:14:14
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 14:19:23
 */
import DeleteArraySql from '../../../src/dao/builder/imp/sql/DeleteArraySql'
import { Sql } from '../../../src/dao/sql'

let receiveRes: Sql

let expectVal: any[] = []
let regSpace = /\s+/g

describe('Dao:Builder:DeleteArraySql', () => {

    beforeAll(async () => {

        let sql = new DeleteArraySql({ tableName: 'aaa' });
        receiveRes = await sql.build([1,2,3, {id: 4}], { xi: 'ha'})
        expectVal = [1, 2, 3, 4, 'ha']
    })

    test('mysql', async () => {
        let expectSql = 'delete from aaa where `id` in (?, ?, ?, ?) and (`xi` = ?)'
        let [receiveSql, receiveVal] = [receiveRes.toSql().trim(), receiveRes.toVal()]
        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })

    test('pg', async () => {
        let expectSql = 'delete from aaa where "id" in ($1, $2, $3, $4) and ("xi" = $5)'
        let [receiveSql, receiveVal] = [receiveRes.toSql('pg').trim(), receiveRes.toVal()]

        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })
})