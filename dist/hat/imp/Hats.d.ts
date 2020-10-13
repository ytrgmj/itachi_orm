import BaseHat from '../BaseHat';
export default class Hats extends BaseHat {
    getKeys(): Array<string>;
    protected getHatsClazz(): Array<any>;
    protected getHats(): any[];
    process(list: any): Promise<any>;
}
