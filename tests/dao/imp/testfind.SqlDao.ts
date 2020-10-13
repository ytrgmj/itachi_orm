/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-26 15:09:21
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-27 17:03:11
 */

import SqlDao from '../../../src/dao/imp/SqlDao'
import Sql from '../../../src/dao/sql/Sql'
import Query from '../../../src/dao/query/Query'
import { Cdt, OrCdt } from '../../../src/dao/query/cdt/imp'

class TestDao extends SqlDao {
    _acqExecutor() {
        return {
            execute(sql: Sql) {
                console.log(sql.toSql('pg'), sql.toVal());

            },
            query(sql) {
                return this.execute(sql);
            }
        }
    }
}
it('testFind', async () => {
    var dao = new TestDao({ tableName: 'aaa' });

    const query = new Query()
    query.col('name, col1')
        .eq('aa', 1)
        .in('bb', [1,2,3])
        .isNotNull('cc')

    const orCdt = new OrCdt()
    orCdt.eq('c1', 1).bigEq('c2', 2).notIn('c3', ['c31', 'c32'])
    query.addCdt(orCdt)

    await dao.find(query)

})