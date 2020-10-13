import OnChangeOpt from "./inf/OnChangeOpt";
interface AddAndUpdateOpt {
    addCol?: string;
    updateCol?: string;
    processFun?(dao: any, obj: any): any;
}
export default class DaoUtil {
    /**
     *
     * 当数据往数据库里面插以后，执行该参数
     *  fun的参数 dao,array[变化的数据的数组形式],type 类型
     * @param fun
     */
    static createAfterRun(fun: Function): Function;
    /**
     * 给增加修改的时候设置某个值
     * @param opt
     */
    static createAddAndUpdate(opt: AddAndUpdateOpt): Function;
    /**
     * 创建一个基于数据变化的
     */
    static createOnChangeDecorator(changeOpt: OnChangeOpt): Function;
}
export {};
