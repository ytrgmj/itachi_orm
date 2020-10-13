import { ColSql, Sql } from '../sql'

export default class OrderItem {
    private col: string;
    private desc: string;
    constructor(col: string, desc?: string) {
        this.col = col
        if (desc != 'desc' && desc != 'DESC') {
            this.desc = null
        } else {
            this.desc = 'desc'
        }
    }
    getCol(): string {
        return this.col
    }
    getDesc(): string {
        if (this.desc == null) {
            this.desc = 'asc'
        }
        return this.desc
    }

    toSql(): Sql {
        const sql = new Sql()
        sql.add(new ColSql(this.col))
        sql.add(this.desc)
        return sql
    }
}
