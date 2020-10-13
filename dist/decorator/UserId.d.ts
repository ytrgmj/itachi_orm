/**
 * 在上下文注册builder
 */
interface UserIdOpt {
    add_col?: string;
    update_col?: string;
}
export default function (opt?: UserIdOpt): Function;
export {};
