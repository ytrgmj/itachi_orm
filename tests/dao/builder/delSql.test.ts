/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-28 11:45:01
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 14:15:27
 */

import DelSql from '../../../src/dao/builder/imp/sql/DelSql'
import { Sql } from '../../../src/dao/sql'

let receiveRes: Sql

let expectVal: any[] = []
let regSpace = /\s+/g

describe('Dao:Builder:DelSql', () => {

    beforeAll(async () => {

        let sql = new DelSql({ tableName: 'aaa' });
        receiveRes = await sql.build({ id: 1}, { shop_id: 2, name: 'bbbb' })
        expectVal = [1, 2, 'bbbb']
    })

    test('mysql', async () => {
        let expectSql = 'delete from aaa where `id` = ? and (`shop_id` = ? and `name` = ?)'
        let [receiveSql, receiveVal] = [receiveRes.toSql().trim(), receiveRes.toVal()]
        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })

    test('pg', async () => {
        let expectSql = 'delete from aaa where "id" = $1 and ("shop_id" = $2 and "name" = $3)'
        let [receiveSql, receiveVal] = [receiveRes.toSql('pg').trim(), receiveRes.toVal()]

        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })
})