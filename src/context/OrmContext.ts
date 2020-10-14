import {Context} from 'itachi_core'
import TransManager from '../tans/TransManager'


export default class OrmContext{
    static regContext(context:Context){
        context.regClazz('TransManager',TransManager);
    }
}