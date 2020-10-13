/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-27 18:15:00
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 14:16:06
 */

import AddSql from '../../../src/dao/builder/imp/sql/AddSql'
import { Sql } from '../../../src/dao/sql'

let receiveRes: Sql

let expectVal: any[] = []
let regSpace = /\s+/g

describe('Dao:Builder:AddSql', () => {

    beforeAll(async () => {
        expectVal = [1, 'aaa']

        let sql = new AddSql({ tableName: 'aaa', ids: [ 'id' , 'id1' ] });
        receiveRes = await sql.build({ shop_id: 1, name: 'aaa' })
    })

    test('mysql', async () => {
        let expectSql = 'insert into aaa ( `shop_id` , `name` ) values ( ? ,  ?)'
        let [receiveSql, receiveVal] = [receiveRes.toSql().trim(), receiveRes.toVal()]
        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })

    test('pg', async () => {
        let expectSql = 'insert into aaa ( "shop_id" , "name" ) values ( $1 ,  $2) returning "id","id1"'
        let [receiveSql, receiveVal] = [receiveRes.toSql('pg').trim(), receiveRes.toVal()]

        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })
})