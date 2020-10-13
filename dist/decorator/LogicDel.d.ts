/**
 * 逻辑删除装饰器
 */
/**
 * 1 只在add或者addArray的时候增加is_del = 0
 * 2 在1的基础上del或者delArray的时候。改用update is_del = 1
 */
declare type DelMode = 1 | 2;
/**
 * 默认
 * {delCol:is_del,
 * mode:1
 * }
 */
interface LogicDelOpt {
    col?: string;
    mode?: DelMode;
}
export default function (opt?: LogicDelOpt): <T extends new (...args: any[]) => {}>(constructor: T) => {
    new (...args: any[]): {
        _delMode: DelMode;
        setDelMode(mode: DelMode): void;
        add(obj: any): Promise<any>;
        del(obj: any, opts: any): Promise<any>;
        delArray(array: Array<any>, opts?: any): Promise<any>;
        addArray(array: Array<any>): Promise<any>;
    };
} & T;
export {};
