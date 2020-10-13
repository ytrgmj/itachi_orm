
import Sql from '../../sql/Sql'

export default abstract class BaseCdt {
    clazz:string =  'BaseCdt';
    abstract toSql():Sql;

    getSql():Sql{
        return this.toSql();
    }

    abstract isHit(row):boolean ;

    abstract toEs():any;

    getClazz(){
        return 'BaseCdt'
    }
    static parse(cdt):BaseCdt{
        if(cdt == null)
            return null;
        if(cdt.clazz == 'BaseCdt'){
            return cdt;
        }
        let andCdt = new AndCdt();
        for(var e in cdt){
            if(cdt[e]!=null){
                andCdt.eq(e,cdt[e]);
            }
        }
        return andCdt
    }
}
import AndCdt from './imp/AndCdt'
