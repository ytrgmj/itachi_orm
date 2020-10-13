import SqlDao from '../../../src/dao/imp/SqlDao'
import { Sql, ValSql } from '../../../src/dao/sql'

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
it('testUpdateArray', async () => {
    var dao = new TestDao({ tableName: 'aaa' });
    dao.updateArray([{ shop_id: 123, name: 'aaa', id: 1 }])

    var dao = new TestDao({ tableName: 'aaa' });
    dao.updateArray([
        { shop_id: 123, name: 'aaa', id: 1 },
        { id: 2, name: 'bbb', shop_id: new Sql('shop_id=shop_id +').add(new ValSql(3)) }
    ], { haha: new Sql('haha=haha-').add(new ValSql(1)) })
})
