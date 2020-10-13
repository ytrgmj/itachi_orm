import SysTime from "../../decorator/SysTime";
import { runInContext } from "vm";

@SysTime()
class TestDao {
    async add(opt){
        console.log('add',opt)
    }
    async addArray(opts:Array<any>){
        for(let opt of opts)
            console.log('addArray',opt)
    }

    async update(opt){
        console.log('update',opt)
    }
    async updateArray(opts:Array<any>){
        for(let opt of opts)
            console.log('updateArray',opt)
    }
}

async function run(){
    var dao = new TestDao();
    await dao.add({})
    await dao.update({})

    await dao.addArray([{},{}])
    await dao.updateArray([{},{}])
}
run()
