/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-28 16:29:20
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 18:49:24
 */
import UpdateSql from '../../../src/dao/builder/imp/sql/UpdateSql'
import { Sql, ValSql } from '../../../src/dao/sql'

let receiveRes: Sql

let expectVal: any[] = []
let regSpace = /\s+/g

describe('Dao:Builder:UpdateSql', () => {
    // TODO: 按参数不同, 进行单元测试拆分

    test('mysql', async () => {
        let sql = new UpdateSql({ tableName: 'aaa' });

        const r1 = await sql.build({ shop_id: 123, name: 'aaa', id: 1 })
        const r1SqlExpect = 'update aaa set `shop_id` = ?, `name` = ? where `id` = ?'

        expect(r1.toSql().replace(regSpace, '')).toBe(r1SqlExpect.replace(regSpace, ''))
        expect(r1.toVal()).toEqual([ 123, 'aaa', 1 ])

        sql = new UpdateSql({ tableName: 'aaa', ids: 'shop_id' })
        const r2 = await sql.build({ shop_id: 123, name: 'aaa', id: 1 })
        const r2SqlExpect = 'update aaa set `name` = ?, `id` = ? where `shop_id` = ?'

        expect(r2.toSql().replace(regSpace, '')).toBe(r2SqlExpect.replace(regSpace, ''))
        expect(r2.toVal()).toEqual([ 'aaa', 1, 123 ])


        sql = new UpdateSql({ tableName: 'aaa' })
        const r3 = await sql.build(
            { shop_id: 123, name: 'aaa', cnt: new Sql('cnt=cnt+').add(new ValSql(3)), id: 1 },
            { name: 'bbb', cnt: 3 }
        )
        const r3SqlExpect = 'update   aaa   set  `shop_id` =  ? ,  `name` =  ? ,  cnt=cnt+ ? where  `id` =  ? and  (  `name` =  ?    and      `cnt` =  ? )'
        expect(r3.toSql().replace(regSpace, '')).toBe(r3SqlExpect.replace(regSpace, ''))
        expect(r3.toVal()).toEqual([ 123, 'aaa', 3, 1, 'bbb', 3 ])
    })

    test('pg', async () => {
        let sql = new UpdateSql({ tableName: 'aaa' });

        const r1 = await sql.build({ shop_id: 123, name: 'aaa', id: 1 })
        const r1SqlExpect = 'update aaa set "shop_id" = $1, "name" = $2 where "id" = $3'

        expect(r1.toSql('pg').replace(regSpace, '')).toBe(r1SqlExpect.replace(regSpace, ''))
        expect(r1.toVal()).toEqual([ 123, 'aaa', 1 ])

        sql = new UpdateSql({ tableName: 'aaa', ids: 'shop_id' })
        const r2 = await sql.build({ shop_id: 123, name: 'aaa', id: 1 })
        const r2SqlExpect = 'update aaa set "name" = $1, "id" = $2 where "shop_id" = $3'

        expect(r2.toSql('pg').replace(regSpace, '')).toBe(r2SqlExpect.replace(regSpace, ''))
        expect(r2.toVal()).toEqual([ 'aaa', 1, 123 ])


        sql = new UpdateSql({ tableName: 'aaa' })
        const r3 = await sql.build(
            { shop_id: 123, name: 'aaa', cnt: new Sql('cnt=cnt+').add(new ValSql(3)), id: 1 },
            { name: 'bbb', cnt: 3 }
        )
        const r3SqlExpect = 'update aaa set "shop_id" = $1 , "name" = $2 , cnt=cnt+ $3 where "id" = $4 and ("name" = $5 and "cnt" =  $6)'
        expect(r3.toSql('pg').replace(regSpace, '')).toBe(r3SqlExpect.replace(regSpace, ''))
        expect(r3.toVal()).toEqual([ 123, 'aaa', 3, 1, 'bbb', 3 ])
    })
})