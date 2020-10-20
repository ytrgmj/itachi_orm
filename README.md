
# itachi_orm

## Dao
所有dao类的父类。每个dao对应数据库中的一张表。

## Searcher
封装了所有查询的类。每个searcher也对应数据库中的一张表。
Searcher可以封装带有业务意义的查询。
``` typescript
/**
		 * 通过productno 来查询餐品，其他条件level=brand and status = 'enable'
		 */
		this.reg('findBrandNoInBrand',new Inquiry({
			col:'product_no',
			otherCdt:{
				level:'brand',
				status:'enable'
			}
		}));
		/**
         * 自定义查询，可能通过多个表来查询
         * */
		this.reg('findIdInBrand',new InBrandInquiry());
        /**
         * 多字段查询，通过 brand_id ,product_name进行查询
         * 其他条件 is_del = 0 and level = brand and status = enable 
         */
		this.reg('findBrandName',new KeysInquiry({
			keys:['brand_id','product_name'],
			otherCdt:{
				is_del:0,
				level:'brand',
				status:'enable'
			}
		}))
```
Searcher是自带缓存的，在同一个context下，查询同一个条件，第二次查询会从缓存中得到。不会再次查询数据库。
## hat
通过主表查询分表数据

``` typescript
const list = [ //主表数据
	{
		id:1,
		store_id:800000 //副表字段
	},
	{
		id:2,
		store_id:800001
	}
]
let hat = new Hat({
	context,
	key:'store'  //指定查询
});
let ret = await hat.process(list)
console.log('ret', ret);
``` 

## 装饰器
orm提供各种装饰器。提供各种便利功能。

### ContextId
放在Dao上，在增、改数据的时候，当前的contextId会被写到数据库中。发生问题时候，可以根据contextId在日志中进行查询。

### Trans
放在执行函数上，这个执行函数将被事务包裹。如果这个执行函数抛出异常，事务将被回滚。

### SysTime 
放在dao上，更改和增加数据的时候，系统时间将被写入到对应的字段中。默认字段是sys_add_time 和 sys_modifier_time。可以在systime中指定 addCol和updateCol来更换字段。
``` typescript
@SysTime({updateCol:'update_time',addCol:'add_time'})
class UserDao{
	//userDao 在增加和更新的时候,时间会被写到update_time 和 add_time 里面
}
```

