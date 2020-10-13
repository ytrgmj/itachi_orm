/**
 * 在上下文注册builder
 */
interface SysTimeOpt {
    addCol?: string;
    updateCol?: string;
}
export default function (opt?: SysTimeOpt): Function;
export {};
