import { MysqlDao, PgDao } from '../impletentDao'

it('testDelArray: mysql', async () => {
    var dao = new MysqlDao({ tableName: 'aaa' });
    dao.delArray([1,2,3, {id: 4}], { xi: 'ha'})
})

it('testDelArray: pg', async () => {
    var dao = new PgDao({ tableName: 'aaa' });
    dao.delArray([1,2,3, {id: 4}], { xi: 'ha'})
})