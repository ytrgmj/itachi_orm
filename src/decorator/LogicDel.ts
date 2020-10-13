/**
 * 逻辑删除装饰器
 */

import { DefOnChangeOpt } from "../orm"

/**
 * 1 只在add或者addArray的时候增加is_del = 0
 * 2 在1的基础上del或者delArray的时候。改用update is_del = 1
 */
type DelMode = 1 | 2

/**
 * 默认
 * {delCol:is_del,
 * mode:1
 * }
 */
interface LogicDelOpt {
  col?: string
  mode?: DelMode
}
export default function (opt?: LogicDelOpt) {
    if (opt == null) {
        opt = {}
    }
    const delCol = opt.col || 'is_del';
    const mode = opt.mode || 1

    const changeOpt = new DefOnChangeOpt({
        async onAdd(dao, data) {
            data[delCol] = 0;
        },
        async onDel(dao, data) {
            data[delCol] = 1;
        }
    })
    return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            private _delMode = mode//默认是1
            setDelMode(mode: DelMode) {
              this._delMode = mode
            }
            async add(obj) {
                await changeOpt.onAdd(this, obj)
                var ret = await super['add'](obj)
                return ret;
            }

            async del(obj, opts) {
                let ret
                if (this._delMode === 2) {
                    await changeOpt.onDel(this, obj)
                    ret = await super['update'](obj, opts)
                } else {
                    ret = await super['del'](obj, opts)
                }
                return ret;
            }

            async delArray(array: Array<any>, opts?: any) {
                let ret
                if (this._delMode === 2) {
                    await changeOpt.onDelArray(this, array)
                    ret = await super['updateArray'](array, opts)
                } else {
                    ret = await super['delArray'](array, opts)
                }
                return ret;
            }

            async addArray(array: Array<any>) {
                await changeOpt.onAddArray(this, array)
                var ret = await super['addArray'](array)
                return ret;
            }
        }
    }
}
