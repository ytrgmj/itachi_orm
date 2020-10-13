import SqlDao from '../../../src/dao/imp/SqlDao'
import Sql from '../../../src/dao/sql/Sql'

class TestDao extends SqlDao {
    _acqExecutor() {
        return {
            execute(sql: Sql) {
                console.log(sql.toSql(), sql.toVal());

            },
            query(sql) {
                return this.execute(sql);
            }
        }
    }
}
it.skip('testAdd', async () => {
    var dao = new TestDao({ tableName: 'aaa' });
    dao.add({ shop_id: 1, name: 'aaa' })


})