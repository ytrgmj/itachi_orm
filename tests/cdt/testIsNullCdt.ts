import IsNullCdt from '../../src/dao/query/cdt/imp/IsNullCdt'

test('测试',function(){
    var cdt = new IsNullCdt('aaa');
    var sql = cdt.toSql();
    console.log(sql.toSql());
    console.log(sql.toVal());
    
    
})