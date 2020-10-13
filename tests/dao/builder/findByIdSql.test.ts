/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-28 16:04:58
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 16:34:43
 */
import FindByIdSql from '../../../src/dao/builder/imp/sql/FindByIdSql'
import { Sql } from '../../../src/dao/sql'

let receiveRes: Sql

let expectVal: any[] = []
let regSpace = /\s+/g

describe('Dao:Builder:FindByIdSql', () => {

    beforeAll(async () => {
        expectVal = [ 1 ]

        let sql = new FindByIdSql({ tableName: 'aaa', ids: [ 'shop_id'] });
        receiveRes = await sql.build({ shop_id: 1, name: 'aaa' })
        console.log(receiveRes.toVal())
    })

    test('mysql', async () => {
        let expectSql = 'select * from aaa where `shop_id` = ?'
        let [receiveSql, receiveVal] = [receiveRes.toSql().trim(), receiveRes.toVal()]
        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })

    test('pg', async () => {
        let expectSql = 'select * from aaa where "shop_id" = $1'
        let [receiveSql, receiveVal] = [receiveRes.toSql('pg').trim(), receiveRes.toVal()]

        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })
})