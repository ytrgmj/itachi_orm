"use strict";
/*
 * @Author       : kaikai.hou
 * @Email        : kaikai.hou@downtown8.com
 * @Description  : Balabala
 * @Date         : 2020-02-05 15:12:34
 * @LastEditors  : kaikai.hou
 * @LastEditTime : 2020-02-14 17:50:15
 */
Object.defineProperty(exports, "__esModule", { value: true });
const itachi_core_1 = require("@dt/itachi_core");
const configKey = 'datasources';
class BasePoolFac {
    constructor() {
        this._init = false;
        this._map = {};
    }
    _needNoType() {
        return false;
    }
    _initConfig(opt) {
        const map = {};
        for (let e in opt) {
            map[e] = this.createPool(opt[e]);
        }
        return map;
    }
    _formatConnectOption(config) {
        return config;
    }
    /**
     * @description 连接池工厂初始化
     */
    init() {
        if (this._init)
            return;
        this._init = true;
        let opt = this._loadConfigs();
        this._map = this._initConfig(opt);
    }
    getKeys() {
        this.init();
        let ret = [];
        for (var e in this._map) {
            ret.push(e);
        }
        return ret;
    }
    _loadConfigs() {
        var ret = {};
        var datasources = itachi_core_1.ConfigFac.get(configKey);
        for (var e in datasources) {
            if (this._isMyConfig(datasources[e]))
                ret[e] = datasources[e];
        }
        return ret;
    }
    _isMyConfig(config) {
        if (config.type == this.getType()) {
            return true;
        }
        if (this._needNoType() && (config.type == null)) {
            return true;
        }
        return false;
    }
    getDefPoolName() {
        return 'mysql';
    }
    /**
     * @description get specific pool from factory
     * @param poolName
     */
    get(poolName) {
        if (poolName == null)
            poolName = this.getDefPoolName();
        this.init();
        if (!this._init)
            throw new Error('Please load database config first');
        if (!poolName)
            return this._map[Object.keys(this._map)[0]];
        return this._map[poolName];
    }
}
exports.default = BasePoolFac;
