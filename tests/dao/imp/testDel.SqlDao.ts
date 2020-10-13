/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-27 16:15:20
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-27 16:17:05
 */

import { MysqlDao, PgDao } from '../impletentDao'

test('testDel: mysql', async () => {
    var dao = new MysqlDao({ tableName: 'aaa' });
    dao.del({ id: 1}, { shop_id: 2, name: 'bbbb' })
})

test('testDel: pg', async () => {
    var dao = new PgDao({ tableName: 'aaa' });
    dao.del({ id: 1 }, { shop_id: 2, name: 'bbbb' })
})