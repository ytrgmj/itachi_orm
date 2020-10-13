import { PgUtil } from '../../../src/dao/sqlUtil'

describe('Dao:SqlUtil:PgUtil:valTypeToPgType', () => {
    let pgUtil: PgUtil
    let count: { pgCount: number }
    beforeAll(() => {
        pgUtil = new PgUtil()
    })

    beforeEach(() => {
        count = { pgCount: 0 }
    })

    test('string', () => {
        const type = pgUtil.valTypeToPgType('aaa')
        expect(type).toBe('text')
    })

    test('integer', () => {
        const type = pgUtil.valTypeToPgType(1)
        expect(type).toBe('int')
    })

    test('float', () => {
        const type = pgUtil.valTypeToPgType(1.1)
        expect(type).toBe('float')
    })

    test('boolean', () => {
        const type = pgUtil.valTypeToPgType(true)
        expect(type).toBe('boolean')
    })

    test('bigint', () => {
        const type = pgUtil.valTypeToPgType(BigInt(1))
        expect(type).toBe('bigint')
    })

    test('object:date', () => {
        const type = pgUtil.valTypeToPgType(new Date())
        expect(type).toBe('timestamptz')
    })

    test('object:json', () => {
        const type = pgUtil.valTypeToPgType({a: 111})
        expect(type).toBe('json')
    })

    test('object:array:one-dimensional(int)', () => {
        const type = pgUtil.valTypeToPgType([1])
        expect(type).toBe('int[]')
    })

    test('object:array:three-dimensional(int)', () => {
        const type = pgUtil.valTypeToPgType([[[1,2,3]]])
        expect(type).toBe('int[][][]')
    })

    test('object:array:one-dimensional(text)', () => {
        const type = pgUtil.valTypeToPgType(['1'])
        expect(type).toBe('text[]')
    })

    test('object:array:three-dimensional(boolean)', () => {
        const type = pgUtil.valTypeToPgType([[[true,false,true]]])
        expect(type).toBe('boolean[][][]')
    })
})