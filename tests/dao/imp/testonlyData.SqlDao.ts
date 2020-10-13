import SqlDao from '../../../src/dao/imp/SqlDao'
import Sql from '../../../src/dao/sql/Sql'
import Query from '../../../src/dao/query/Query'

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
test('onlyData: noSch = false', async () => {
    const dao = new TestDao({ tableName: 'aaa' });

    const query = { name: 'aaa' }
    const _query = new Query()
    for (let [k, v] of  Object.entries(query)) {
        _query.eq(k, v)
    }

    const findMock = jest.spyOn(dao, 'find')
    const findMockRes = [
        { id: 2, name: 'aaa', nick: 'xixi1' },
        { id: 1, name: 'aaa', nick: 'xixi2' },
    ]
    findMock.mockResolvedValue(findMockRes)

    const res = await dao.onlyData({
        query,
        noSch: false
    })
    console.log(findMockRes)
    expect(res).toEqual(findMockRes[1])
})

test('onlyData: noSch = true', async () => {
    const dao = new TestDao({ tableName: 'aaa' });

    // const findMock = jest.spyOn(dao, 'find')
    const findMockRes = [
        { id: 3, name: 'aaa', nick: 'xixi1' },
        { id: 1, name: 'aaa', nick: 'xixi2' },
    ]
    // findMock.mockResolvedValue(findMockRes)
    dao.find = jest.fn().mockImplementation(async (query) => {
        return findMockRes
    })

    dao.add = jest.fn().mockImplementation(async (obj) => {
        expect(obj).toEqual({ name: 'aaa', haha: 'hahah1' })
        obj.id = 2
        return obj
    })

    dao.del = jest.fn().mockImplementation(async (obj) => {
        // 返回 id：1, 那么新增的 id: 2 应当被删除
        expect(obj.id).toBe(2)
    })

    const res = await dao.onlyData({
        query: { name: 'aaa' },
        noSch: true,
        data: { haha: 'hahah1', name: 'cover' }
    })

    expect(res).toEqual(findMockRes[1])

})
