import SqlBuilder from '../SqlBuilder';
import Sql from '../../../sql/Sql';
import Query from '../../../query/Query';

export default abstract class BaseFind extends SqlBuilder{
    
    /**
     * 构建where 后面的
     */
    protected _buildWhere(query:Query):Sql{
        
        var sql = new Sql();
        var cdts = query.getCdts()
        
        if (cdts == null || cdts.length == 0) return sql
        if (cdts) {
            this._pushSqlTxt(sql, 'where')
        }
        var count = 0
        
        for (var i = 0; i < cdts.length; i++) {
            if (cdts[i]) {
                if (count > 0) {
                    this._pushSqlTxt(sql, ' and ')
                }
                sql.add(cdts[i].toSql());
                count++
            }
        }
        return sql
    }

    protected _buildJoinTable(query:Query):Sql{
        var list = query.getJoinTables();
        if(list.length == 0)
            return null;
        let sql = new Sql();
        var opt = this._opt;
        for(let joinTable of list){
            sql.add(joinTable.toSql(opt.getTableName()));
        }
        return sql;
    }

    protected abstract _buildFind(query:Query):Sql;

    protected _buildGroup(query:Query):Sql{
        let groups = query.getGroups()
        if (groups == null || groups.length == 0) return null
        let sql = new Sql(' group by ');
        for(var i=0;i<groups.length;i++){
            if(i>0)
                sql.add(',')
            sql.add(groups[i]);
        }
        return sql;
    }
    
    protected _buildHaving(query:Query):Sql{
        var cdts = query.getHaving()
        if (cdts == null || cdts.length == 0) return null
        let sql = new Sql(' having ');
        for (var i = 0; i < cdts.length; i++) {
            if(i>0){
                sql.add(' and ');                
            }
            sql.add(cdts[i].toSql());
        }
        return sql;
    }

    _buildOrder(query:Query):Sql{
        let orders = query.getOrders()
        if (orders == null || orders.length == 0) return null
        let sql = new Sql();
        sql.add('order by')
        for(let i=0;i<orders.length;i++){
            if(i>0)
                sql.add(',')
            sql.add(orders[i].toSql());
        }
        return sql
    }
    /**
     * 产生分页的sql
     * @param sql 
     * @param query 
     */
    protected _buildPage(sql:Sql,query:Query):Sql{
        let pager = query.getPager();
        
        if (pager == null) return sql
        if (!pager.rp) return sql
        var array = []
        var first = pager.first
        if (first == null || isNaN(first)) first = 0

        sql.add(`LIMIT ${parseInt(pager.rp)} OFFSET ${parseInt(first)}`)
        // sql.add( 'LIMIT  ' + parseInt(first) + ' , ' + parseInt(pager.rp))
        return sql
    }

    build(query:any, opts?: any):Sql {
        
        query = Query.parse(query);
        let sql = new Sql();
        sql.add(this._buildFind(query));
        if (query) {
            
            sql.add(this._buildJoinTable(query));
            sql.add(this._buildWhere(query));
            
            sql.add(this._buildGroup(query));
            sql.add(this._buildHaving(query));
            sql.add(this._buildOrder(query));
            sql = this._buildPage(sql,query);

            if (query.isForUpdate()) {
                sql.add('for update')
            }
        }

        return sql;
    }
}