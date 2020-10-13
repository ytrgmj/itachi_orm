
export default interface IExecutor{
    
    /**
     * 执行更新
     * @param sql 
     */
    execute(sql:any);
    /**
     * 执行查询
     * @param sql 
     */
    query(sql:any);
}