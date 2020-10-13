/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-28 10:56:42
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 19:06:06
 */
import AddArraySql from '../../../src/dao/builder/imp/sql/AddArraySql'
import { Sql } from '../../../src/dao/sql'

let receiveRes: Sql

let expectVal: any[] = []
let regSpace = /\s+/g

describe('Dao:Builder:AddArraySql', () => {

    beforeAll(async () => {

        let sql = new AddArraySql({ tableName: 'aaa' });
        receiveRes = await sql.build([{ shop_id: 1, name: 'aaa' }, { shop_id: 2, name: 'bbbb' }])
        expectVal = [1, 'aaa', 2, 'bbbb']
    })

    test('mysql', async () => {
        let expectSql = 'insert into aaa (`shop_id` , `name` ) values (? , ?), (?, ?)'
        let [receiveSql, receiveVal] = [receiveRes.toSql().trim(), receiveRes.toVal()]
        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })

    test('pg', async () => {
        let expectSql = 'insert into aaa ("shop_id" , "name" ) values ( $1 ,  $2), ($3, $4) returning "id"'
        let [receiveSql, receiveVal] = [receiveRes.toSql('pg').trim(), receiveRes.toVal()]

        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })
})