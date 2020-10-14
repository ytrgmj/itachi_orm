"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
var SyncData_1 = require("./syncData/SyncData");
Object.defineProperty(exports, "SyncData", { enumerable: true, get: function () { return SyncData_1.default; } });
var OrmContext_1 = require("./context/OrmContext");
Object.defineProperty(exports, "OrmContext", { enumerable: true, get: function () { return OrmContext_1.default; } });
var TransManager_1 = require("./tans/TransManager");
Object.defineProperty(exports, "TransManager", { enumerable: true, get: function () { return TransManager_1.default; } });
var SortCol_1 = require("./decorator/SortCol");
Object.defineProperty(exports, "SortCol", { enumerable: true, get: function () { return SortCol_1.default; } });
var StoreTime_1 = require("./decorator/StoreTime");
Object.defineProperty(exports, "StoreTime", { enumerable: true, get: function () { return StoreTime_1.default; } });
var SysTime_1 = require("./decorator/SysTime");
Object.defineProperty(exports, "SysTime", { enumerable: true, get: function () { return SysTime_1.default; } });
var UserId_1 = require("./decorator/UserId");
Object.defineProperty(exports, "UserId", { enumerable: true, get: function () { return UserId_1.default; } });
var ContextId_1 = require("./decorator/ContextId");
Object.defineProperty(exports, "ContextId", { enumerable: true, get: function () { return ContextId_1.default; } });
var Trans_1 = require("./decorator/Trans");
Object.defineProperty(exports, "Trans", { enumerable: true, get: function () { return Trans_1.default; } });
var LogicDel_1 = require("./decorator/LogicDel");
Object.defineProperty(exports, "LogicDel", { enumerable: true, get: function () { return LogicDel_1.default; } });
var DaoUtil_1 = require("./util/DaoUtil");
Object.defineProperty(exports, "DaoUtil", { enumerable: true, get: function () { return DaoUtil_1.default; } });
var DefOnChangeOpt_1 = require("./util/inf/imp/DefOnChangeOpt");
Object.defineProperty(exports, "DefOnChangeOpt", { enumerable: true, get: function () { return DefOnChangeOpt_1.default; } });
var SearcherHat_1 = require("./hat/imp/SearcherHat");
Object.defineProperty(exports, "SearcherHat", { enumerable: true, get: function () { return SearcherHat_1.default; } });
var BaseHat_1 = require("./hat/BaseHat");
Object.defineProperty(exports, "BaseHat", { enumerable: true, get: function () { return BaseHat_1.default; } });
var Hat_1 = require("./hat/imp/Hat");
Object.defineProperty(exports, "Hat", { enumerable: true, get: function () { return Hat_1.default; } });
var GroupHat_1 = require("./hat/imp/GroupHat");
Object.defineProperty(exports, "GroupHat", { enumerable: true, get: function () { return GroupHat_1.default; } });
var Hats_1 = require("./hat/imp/Hats");
Object.defineProperty(exports, "Hats", { enumerable: true, get: function () { return Hats_1.default; } });
var TablesInquiry_1 = require("./searcher/inquiry/imp/TablesInquiry");
Object.defineProperty(exports, "TablesInquiry", { enumerable: true, get: function () { return TablesInquiry_1.default; } });
var ProxyInquiry_1 = require("./searcher/inquiry/imp/ProxyInquiry");
Object.defineProperty(exports, "ProxyInquiry", { enumerable: true, get: function () { return ProxyInquiry_1.default; } });
var KeysInquiry_1 = require("./searcher/inquiry/imp/KeysInquiry");
Object.defineProperty(exports, "KeysInquiry", { enumerable: true, get: function () { return KeysInquiry_1.default; } });
var BaseInquiry_1 = require("./searcher/inquiry/BaseInquiry");
Object.defineProperty(exports, "BaseInquiry", { enumerable: true, get: function () { return BaseInquiry_1.default; } });
var Inquiry_1 = require("./searcher/inquiry/imp/Inquiry");
Object.defineProperty(exports, "Inquiry", { enumerable: true, get: function () { return Inquiry_1.default; } });
var Searcher_1 = require("./searcher/Searcher");
Object.defineProperty(exports, "Searcher", { enumerable: true, get: function () { return Searcher_1.default; } });
var Col_1 = require("./dao/col/Col");
Object.defineProperty(exports, "Col", { enumerable: true, get: function () { return Col_1.default; } });
var Builder_1 = require("./dao/builder/Builder");
Object.defineProperty(exports, "Builder", { enumerable: true, get: function () { return Builder_1.default; } });
var Dao_1 = require("./dao/Dao");
Object.defineProperty(exports, "Dao", { enumerable: true, get: function () { return Dao_1.default; } });
var BaseCdt_1 = require("./dao/query/cdt/BaseCdt");
Object.defineProperty(exports, "BaseCdt", { enumerable: true, get: function () { return BaseCdt_1.default; } });
var NotCdt_1 = require("./dao/query/cdt/imp/NotCdt");
Object.defineProperty(exports, "NotCdt", { enumerable: true, get: function () { return NotCdt_1.default; } });
// import SqlDao from './dao/imp/SqlDao';
// import IExecutor from './dao/executor/IExecutor';
// console.log('aaaaa');
// export {
//     SqlDao,
//     IExecutor
// }
// TODO: export 内容整理
var SqlDao_1 = require("./dao/imp/SqlDao");
Object.defineProperty(exports, "SqlDao", { enumerable: true, get: function () { return SqlDao_1.default; } });
// Sql
__exportStar(require("./dao/sql"), exports);
var Query_1 = require("./dao/query/Query");
Object.defineProperty(exports, "Query", { enumerable: true, get: function () { return Query_1.default; } });
var JoinTable_1 = require("./dao/query/JoinTable");
Object.defineProperty(exports, "JoinTable", { enumerable: true, get: function () { return JoinTable_1.default; } });
var OrderItem_1 = require("./dao/query/OrderItem");
Object.defineProperty(exports, "OrderItem", { enumerable: true, get: function () { return OrderItem_1.default; } });
// pool fac
var BasePoolFac_1 = require("./pool/BasePoolFac");
Object.defineProperty(exports, "BasePoolFac", { enumerable: true, get: function () { return BasePoolFac_1.default; } });
// core
var itachi_core_1 = require("itachi_core"); // 为了保持 ConfigFac init 和 get 时的版本一致性
Object.defineProperty(exports, "ConfigFac", { enumerable: true, get: function () { return itachi_core_1.ConfigFac; } });
// cdt
__exportStar(require("./dao/query/cdt/imp"), exports);
// sql builder
__exportStar(require("./dao/builder/imp/sql"), exports);
// sqlUtil
__exportStar(require("./dao/sqlUtil"), exports);
