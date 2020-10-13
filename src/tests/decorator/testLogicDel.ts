import LogicDel from "../../decorator/LogicDel";
import { SqlDao } from "../../orm";

@LogicDel()
class Test1Dao extends SqlDao {
    _acqExecutor() {
        return {
            execute(sql: any) {
                console.log('execute sql', sql.toSql(),sql.toVal())
                return {insertId:1,affectRows:10}
            },
            /**
             * 执行查询
             * @param sql 
             */
            query(sql: any) {
                console.log('query sql', sql)
            }
        }
    }
}
@LogicDel({ mode: 2 })
class Test2Dao extends SqlDao {
    _acqExecutor() {
        return {
            execute(sql: any) {
                console.log('execute sql', sql.toSql(),sql.toVal())
                return {insertId:1,affectRows:10}
            },
            /**
             * 执行查询
             * @param sql 
             */
            query(sql: any) {
                console.log('query sql', sql)
            }
        }
    }
}

async function run() {
    var dao1 = new Test1Dao({tableName:"test1"});
    await dao1.add({ id: 1 })
    await dao1.addArray([{ id: 1 }, { id: 2 }])

    await dao1.del({ id: 1 })
    await dao1.delArray([{ id: 1 }, { id: 2 }])

    var dao2 = new Test2Dao({tableName:"test2"});
    await dao2.add({ id: 1 })
    await dao2.addArray([{ id: 1 }, { id: 2 }])

    await dao2.del({ id: 1 })
    await dao2.delArray([{ id: 1 }, { id: 2 }])
}
run().catch(e=>{console.error(e)})
