import {ArrayUtil} from '@dt/itachi_core'
import Hat from './Hat'
import BaseCdt from '../../dao/query/cdt/BaseCdt'
import { Query } from '../../orm';
/**
 * _acqGroup //group 字段
 * acqCol //返回的查询字段
 * async _acqOtherCdt // 返回的其他字段
 * 通过group查询的帽子
 */
export default abstract class GroupHat extends Hat{
    protected abstract acqDataCol():string;
    protected async _schMap(list){
        let opt = this._opt;
        let dao = this.getDao();
        let query = await this._buildQuery(list);
        let array = await dao.find(query);
        return this._toMap(array);
    }
    protected _toMap(array) {
		if(array.length == 0)
			return {};
		return ArrayUtil.toMapByKey(array,this.acqDataCol())
    }

    async _processData(data,hatData){
        data.cnt = hatData.cnt
    }
    /**
     * 返回列
     */
    protected acqCol(){
        return [this.acqDataCol() ,'count(*) as cnt']
    }

    /**
     * 返回group字段
     */
    protected _acqGroup(){
        return [this.acqDataCol()];
    }
    protected async  _buildQuery(list){
        let query = new Query();
        query.in(this.acqDataCol(),this._acqIdsFromList(list));
        query.addCdt( await this._acqOtherCdt(list));
        query.col(this.acqCol());
        query.group(this._acqGroup())

        return query;
    }

    protected async  _acqOtherCdt(list){
        let opt = this._opt;
        if(opt.otherCdt){
            return opt.otherCdt;
        }
    }

    protected async _acqDefData(data){
        return {
            [this.acqDataCol()]:data[this.acqDataCol()],
            cnt:0
        }
    }

    
}
