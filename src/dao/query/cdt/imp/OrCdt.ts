import {JsonUtil} from '@dt/itachi_util'

import ArrayCdt from '../ArrayCdt'
import Sql from '../../../sql/Sql'
import BaseCdt from '../BaseCdt'



export default class OrCdt extends ArrayCdt{
	toEs() {
		let q = {}
		for (let cdt of this._array) {
			JsonUtil.add(q, ['bool', 'should'], cdt.toEs()) 
		}
		return q
	}
	toSql(): Sql {
		return this.toSqlStr('or');
	}
	isHit(obj) {
		var ret = false;
		for(var cdt of this._array){
			if(cdt.isHit(obj)){
				ret = true;
				break;
			}
		}
		return ret;
	}
}

