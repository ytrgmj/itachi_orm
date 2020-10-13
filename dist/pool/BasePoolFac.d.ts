import { BaseOption } from './poolOptions';
export default abstract class BasePoolFac {
    protected _init: Boolean;
    protected _map: object;
    protected _needNoType(): boolean;
    protected abstract getType(): string;
    /**
     * init 的时候调用
      * @description 具体实现
      * @param config
      */
    protected abstract createPool(config: any): any;
    constructor();
    protected _initConfig(opt: any): object;
    protected _formatConnectOption(config: BaseOption): any;
    /**
     * @description 连接池工厂初始化
     */
    init(): void;
    getKeys(): any[];
    _loadConfigs(): any;
    _isMyConfig(config: any): boolean;
    getDefPoolName(): string;
    /**
     * @description get specific pool from factory
     * @param poolName
     */
    get(poolName: string): any;
}
