import SqlDao from '../../../src/dao/imp/SqlDao'
import Sql from '../../../src/dao/sql/Sql'
import Query from '../../../src/dao/query/Query'
import { ArrayUtil } from '@dt/itachi_core'
import { doesNotMatch } from 'assert'

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
test('onlyArray', async () => {
    const dao = new TestDao({ tableName: 'aaa' });
    var array = [

        { name: 'aaa1', val: 220 },
        { name: 'aaa2', val: 33 },
        { name: 'aaa3', val: 44 }
    ]
    var addArray = [

        { name: 'aaa1', name1: 200, val: 220 },
        { name: 'aaa2', name1: 300, val: 0 },
        { name: 'aaa3', name1: 400, val: 44 }
    ]


    var query = new Query()

    let [ addsRes, updatesRes, delsRes ] = [[], [], []]

    query.in('name', ArrayUtil.toArray(array, 'name'))
    await dao.onlyArray({
        array: array,
        finds: () => {
            return [
                { id: 1, name: 'aaa1', val: 220 },
                { id: 2, name: 'aaa1', val: 220 },
                { id: 2, name: 'aaa5', val: 220 }
            ]
        },
        mapFun: function (data) {
            return data.name + '_' + data.val
        },
        addDataArray: addArray,
        needUpdate: true,
        updateFun: function (data) {
            data.gmt_modify = 'new Date'
            return data
        },
        sortFun: function (o1, o2) {
            return o1.val - o2.val
        },
        async adds(list) {
            addsRes = list
        },
        async updates(list) {
            updatesRes = list
        },
        async dels(list){
            delsRes.push(list)
        },
        needDel: true,
        noLastFind: false,
        noDel: false
    })

    expect(addsRes).toEqual([
        { name: 'aaa2', val: 33 },
        { name: 'aaa3', val: 44, name1: 400 }
    ])

    expect(updatesRes).toEqual([
        {
            name: 'aaa1',
            val: 220,
            gmt_modify: 'new Date',
            id: 1
        }
    ])

    expect(delsRes.length).toBe(2)

    expect(delsRes[0]).toEqual(
        [ { id: 2, name: 'aaa5', val: 220 } ]
    )

    expect(delsRes[1]).toEqual(
        [ { id: 2, name: 'aaa1', val: 220 } ]
    )
})
