import { MysqlDao, PgDao } from '../impletentDao'

const testFn = async (Dao) => {
    var dao = new Dao({ tableName: 'aaa' });
    dao.findByIds([ 1 ])
    dao.findByIds([ 1 ], 'name')
    dao.findByIds([ 1 ], 'name', 'xixi')
}
test('findByIds: mysql', async () => {
    testFn(MysqlDao)
})

test('findByIds: pg', async () => {
    testFn(PgDao)
})