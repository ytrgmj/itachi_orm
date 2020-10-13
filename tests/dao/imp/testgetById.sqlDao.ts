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
test('getById', async () => {
    var dao = new TestDao({ tableName: 'aaa' });
    dao.getById(1)
    dao.getById({ id: 1})
    const dao2 = new TestDao({ tableName: 'aaa', ids: [ 'id', 'name']})
    dao2.getById({ id: 1, name: '2222'})
})