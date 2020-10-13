import {DateUtil} from '@dt/itachi_core';
import Query from '../../../src/dao/query/Query'

test('testIsHit',function(){
    function run(query:Query){
        console.log('----------------------');
        
        let array = query.hitList(list)
        console.log('array',array);
        
    }
    let list = [
        {name:'aaa', age:20,date:DateUtil.parse('2020-08-12')},
        {name:'bbb', age:10,date:DateUtil.parse('2020-08-15')},
        {name:'cccc', age:15,date:DateUtil.parse('2020-09-01')},
        {name:'bbb', age:12,date:DateUtil.parse('2020-08-16')},
        {name:'bbb', age:14,date:DateUtil.parse('2020-08-17')},
        {name:'bbb', age:25,date:'2020-09-01'}


    ]

    run(new Query().eq('name','bbb'))
    run(new Query()
        .eq('name','bbb')
        .less('age',25)
        .big('age',12)
        )
     run(new Query()
        .eq('name','bbb')
        .lessEq('date','2020-09-01')
        .bigEq('date','2020-08-16')
     )
    run(new Query()
        .eq('name','bbb')
        .lessEq('date',DateUtil.parse('2020-09-01'))
        .bigEq('date',DateUtil.parse('2020-08-16'))
        )
})