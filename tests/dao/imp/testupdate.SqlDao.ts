import SqlDao from '../../../src/dao/imp/SqlDao'
import { Sql, ColSql, ValSql } from '../../../src/dao/sql'

class TestDao extends SqlDao {
    _acqExecutor() {
        return {
            execute(sql: Sql) {
                console.log(sql.toSql(), sql.toVal());

            },
            query(sql: Sql) {
                return this.execute(sql);
            }
        }
    }
}
it('testUpdate', async () => {
    var dao = new TestDao({ tableName: 'aaa' });
    dao.update({ shop_id: 123, name: 'aaa', id: 1 })

    var dao = new TestDao({ tableName: 'aaa', ids: 'shop_id' });
    dao.update({ shop_id: 123, name: 'aaa', id: 1 })

    var dao = new TestDao({ tableName: 'aaa', ids: ['shop_id', 'name'] });
    dao.update({ shop_id: 123, name: 'aaa', id: 1 })

    var dao = new TestDao({ tableName: 'aaa' });
    dao.update({ shop_id: 123, name: 'aaa', id: 1 }, { name: 'bbb' })


    var dao = new TestDao({ tableName: 'aaa' });
    dao.update({ shop_id: 123, name: 'aaa', id: 1 }, { name: 'bbb', cnt: 3 })


    var dao = new TestDao({ tableName: 'aaa' });
    dao.update({ shop_id: 123, name: 'aaa', cnt: new Sql('cnt=cnt+').add(new ValSql(3)), id: 1 },
        { name: 'bbb', cnt: 3 })


})
