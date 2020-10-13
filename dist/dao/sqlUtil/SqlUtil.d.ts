export default abstract class SqlUtil {
    protected escapeCharacter: string;
    protected placeHolder: string;
    protected type: string;
    escapeId(col?: string): string;
    /**
     * @description 参数化处理, 占位符
     */
    abstract escapeParameters(count?: object): string;
    abstract returnStr(cols: string[]): string;
}
