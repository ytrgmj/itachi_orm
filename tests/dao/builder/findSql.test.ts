/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-28 14:21:58
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-28 17:55:48
 */
import FindSql from '../../../src/dao/builder/imp/sql/FindSql'
import { Sql } from '../../../src/dao/sql'
import Query from '../../../src/dao/query/Query'
import { OrCdt } from '../../../src/dao/query/cdt/imp'
import JoinTable from '../../../src/dao/query/JoinTable'

let receiveRes: Sql

let expectVal: any[] = []
let regSpace = /\s+/g

describe('Dao:Builder:FindSql', () => {

    beforeAll(async () => {
        let sql = new FindSql({ tableName: 'aaa' });

        const query = new Query()

        query.col('aaa.name, aaa.c1')
        .eq('aaa.aa', 1)
        .in('aaa.bb', [1, 2, 3])
        .isNotNull('aaa.cc')

        const orCdt = new OrCdt()
        orCdt.eq('aaa.c1', 1).bigEq('aaa.c2', 2).notIn('aaa.c3', ['c31', 'c32'])
        query.addCdt(orCdt)

        const join = new JoinTable('bbb', 'a_bid', 'bid')
        join.setAlias('b').setType('left')
        query.joinTable(join)

        query.first(100).size(20)
        query.order('aaa.a_bid', 'asc')

        receiveRes = await sql.build(query)
        expectVal = [ 1, 1, 2, 3, 1, 2, 'c31', 'c32' ]
    })

    test('mysql', async () => {
        let expectSql = `
            select aaa.name, aaa.c1 from aaa
            left join bbb b on aaa.a_bid=b.bid
            where \`aaa\`.\`aa\` =  ?
            and \`aaa\`.\`bb\` in  (?,?,?)
            and \`aaa\`.\`cc\` is not null
            and (
                \`aaa\`.\`c1\` = ?
                or \`aaa\`.\`c2\` >= ?
                or \`aaa\`.\`c3\` not in (?,?)
            ) order by \`aaa\`.\`a_bid\` LIMIT 20 OFFSET 100
        `
        let [receiveSql, receiveVal] = [receiveRes.toSql().trim(), receiveRes.toVal()]
        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })

    test('pg', async () => {
        let expectSql = `
            select aaa.name, aaa.c1 from aaa
            left join bbb b on aaa.a_bid=b.bid
            where "aaa"."aa" = $1
            and "aaa"."bb" in ($2, $3, $4)
            and "aaa"."cc" is not null
            and (
                "aaa"."c1" = $5
                or "aaa"."c2" >= $6
                or "aaa"."c3" not in ($7, $8)
            ) order by "aaa"."a_bid" LIMIT 20 OFFSET 100
        `
        let [receiveSql, receiveVal] = [receiveRes.toSql('pg').trim(), receiveRes.toVal()]

        expect(receiveSql.replace(regSpace, '')).toBe(expectSql.replace(regSpace, ''))
        expect(receiveVal).toEqual(expectVal)
    })
})