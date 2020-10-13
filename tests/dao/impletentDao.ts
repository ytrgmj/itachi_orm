/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-27 11:53:42
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-27 17:51:42
 */
import SqlDao from '../../src/dao/imp/SqlDao'
import { Sql } from '../../src/dao/sql'
import { sqlType } from '../../src/constant'

export class MysqlDao extends SqlDao {
    _acqExecutor() {
        return {
            execute(sql: Sql) {
                console.log(sql.toSql(sqlType.mysql), sql.toVal());

            },
            query(sql) {
                return this.execute(sql);
            }
        }
    }
}

export class PgDao extends SqlDao {
    _acqExecutor() {
        return {
            execute(sql: Sql) {
                console.log(sql.toSql(sqlType.pg), sql.toVal());

            },
            query(sql) {
                return this.execute(sql);
            }
        }
    }
}

test('impletentDao', () => {})