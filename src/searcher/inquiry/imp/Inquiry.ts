
import BaseInquiry from "../BaseInquiry";
/**
 * 单条件查询
 */
export default class Inquiry extends BaseInquiry{
    protected async _findFromDb(params: any):Promise<Array<any>> {
        var query =  new Query()
        query = await this.processQuery(query, params)
        var list = await this.getDao().find(query)
        
        
        return list
    }    
    acqDataCode(data: any): string {
        if(this._checkOtherCdt(data))
            return data[this.acqCol()].toString().toLowerCase();
        return null;
    }
    acqCode(param: any): string {
        return param.toString().toLowerCase();
    }
    acqCol():string{
        var opt = this._opt;
        return opt.col;
    }
    
    protected async processQuery(query:Query,params):Promise<Query>{
        query.addCdt(await this._buildCdt(params))
        let schCols = this.acqSchCols();
        query.col(schCols);
        return query
    }
    /**
     * 构建查询条件
     * @param params 
     */
    protected  async _buildCdt(params) {
       
        var cdt = new Cdt(this.acqCol(),params)
        return await this._addOtherCdt(cdt)
    }
    async _addOtherCdt(optCdt){
        var otherCdt = this.acqOtherCdt()
        if (otherCdt == null) {
            return optCdt;      
        } else {
            var andCdt = new AndCdt()
            andCdt.addCdt(optCdt)
            if(otherCdt instanceof Array){
                for(var cdt of otherCdt){
                    andCdt.addCdt(cdt)
                }
            }else{
                if(otherCdt['clazz']== 'BaseCdt' ){
                    andCdt.addCdt(otherCdt)
                }else{
                    for (var e in otherCdt) {
                        andCdt.eq(e, otherCdt[e])
                    }
                }
            }
            return andCdt
        }
    }
   
}
import Query from "../../../dao/query/Query";
import Cdt from "../../../dao/query/cdt/imp/Cdt";
import AndCdt from "../../../dao/query/cdt/imp/AndCdt";
import BaseCdt from "../../../dao/query/cdt/BaseCdt";




