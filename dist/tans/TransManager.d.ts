import { Context } from "itachi_core";
export default class TransManager {
    private _context;
    setContext(context: Context): void;
    private _map;
    private _transNum;
    getTransNum(): number;
    /**
     * 开始事物
     */
    beginTran(): Promise<void>;
    /**
     *
     * 提交事务
     */
    commitTran(): Promise<void>;
    /**
     * 回滚
     */
    rollbackTran(): Promise<void>;
    private _printLog;
}
