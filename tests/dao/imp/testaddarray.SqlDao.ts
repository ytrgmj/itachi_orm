import { MysqlDao, PgDao } from '../impletentDao'

test('testAddArray mysql', async () => {
    var dao = new MysqlDao({ tableName: 'aaa' });
    dao.addArray([{ shop_id: 1, name: 'aaa' }, { shop_id: 2, name: 'bbbb' }])
})

test('testAddArray pg', async () => {
    var dao = new PgDao({ tableName: 'aaa' });
    dao.addArray([{ shop_id: 1, name: 'aaa' }, { shop_id: 2, name: 'bbbb' }])
})