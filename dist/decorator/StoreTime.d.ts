/**
 * 在上下文注册builder
 */
interface StoreTimeOpt {
    addCol?: string;
    updateCol?: string;
}
export default function (opt?: StoreTimeOpt): Function;
export {};
