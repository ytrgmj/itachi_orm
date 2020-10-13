import Trans from '../../decorator/Trans'

class  TestTrans{

    _val:number = 10;
    @Trans()
    test1(){
        this._val ++;
        console.log('this._val test1:',this._val);
        
        this.test2(this._val);
        return 'test1'
    }
    protected test2(val){
        console.log('test2',val);
        
    }
}

let ins = new TestTrans();

console.log(ins.test1())

