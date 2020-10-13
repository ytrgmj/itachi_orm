/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-28 18:38:28
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 19:01:36
 */

import UpdateArraySql from '../../../src/dao/builder/imp/sql/UpdateArraySql'
import { Sql, ValSql } from '../../../src/dao/sql'

let receiveRes: Sql

let expectVal: any[] = []
let regSpace = /\s+/g
let sql: UpdateArraySql

describe('Dao:Builder:UpdateArraySql', () => {
    // TODO: 按参数不同, 进行单元测试拆分


    beforeAll(async () => {
        expectVal = [1, 'aaa']

        sql = new UpdateArraySql({ tableName: 'aaa' });
    })

    test('mysql', async () => {
        const receiveRes1 = await sql.build([{ shop_id: 123, name: 'aaa', id: 1 }])
        const expectSql1 = 'update aaa set `shop_id` = CASE id  WHEN ? THEN  ? end ,  `name` = CASE id   WHEN  ? THEN  ? end  where  `id` in (?)'

        expect(receiveRes1.toSql().replace(regSpace, '')).toBe(expectSql1.replace(regSpace, ''))
        expect(receiveRes1.toVal()).toEqual([1, 123, 1, 'aaa', 1])

        const receiveRes2 = await sql.build(
            [
                { shop_id: 123, name: 'aaa', id: 1 },
                { id: 2, name: 'bbb', shop_id: new Sql('shop_id=shop_id +').add(new ValSql(3)) }
            ],
            {
                haha: new Sql('haha=haha-').add(new ValSql(1))
            }
        )
        const expectSql2 = `
            update aaa set \`shop_id\` = CASE id WHEN  ? THEN ? WHEN  ? THEN shop_id=shop_id + ? end  ,
                \`name\` = CASE id  WHEN ? THEN ? WHEN ? THEN ? end,
                haha=haha- ?
            where \`id\` in  (?,?)
        `
        expect(receiveRes2.toSql().replace(regSpace, '')).toBe(expectSql2.replace(regSpace, ''))
        expect(receiveRes2.toVal()).toEqual([ 1, 123, 2, 3, 1, 'aaa', 2, 'bbb', 1, 1, 2 ])
    })

    test('pg', async () => {
        const receiveRes1 = await sql.build([{ shop_id: 123, name: 'aaa', id: 1 }])
        const expectSql1 = 'update aaa set "shop_id" = CASE id  WHEN $1 THEN $2 end ,  "name" = CASE id   WHEN  $3 THEN  $4 end  where  "id" in ($5)'

        expect(receiveRes1.toSql('pg').replace(regSpace, '')).toBe(expectSql1.replace(regSpace, ''))
        expect(receiveRes1.toVal()).toEqual([1, 123, 1, 'aaa', 1])

        const receiveRes2 = await sql.build(
            [
                { shop_id: 123, name: 'aaa', id: 1 },
                { id: 2, name: 'bbb', shop_id: new Sql('shop_id=shop_id +').add(new ValSql(3)) }
            ],
            {
                haha: new Sql('haha=haha-').add(new ValSql(1))
            }
        )
        const expectSql2 = `
            update aaa set \"shop_id\" = CASE id WHEN $1 THEN $2 WHEN $3 THEN shop_id=shop_id + $4 end ,
                \"name\" = CASE id  WHEN $5 THEN $6 WHEN $7 THEN $8 end,
                haha=haha- $9
            where \"id\" in  ($10,$11)
        `
        expect(receiveRes2.toSql('pg').replace(regSpace, '')).toBe(expectSql2.replace(regSpace, ''))
        expect(receiveRes2.toVal()).toEqual([ 1, 123, 2, 3, 1, 'aaa', 2, 'bbb', 1, 1, 2 ])
    })
})
