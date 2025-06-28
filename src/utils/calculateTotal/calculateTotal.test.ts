import { describe, it, expect } from 'vitest'
import { calculateTotal } from './calculateTotal'

describe('calculateTotal', () => {

    describe('valid inputs', () => {
        it('should calculate total for comma-separated amounts', () => {
        expect(calculateTotal('100, 200, 300')).toBe(600)
        })

        it('should calculate total for newline-separated amounts', () => {
        expect(calculateTotal('100\n200\n300')).toBe(600)
        })

        it('should calculate total for mixed comma and newline separators', () => {
        expect(calculateTotal('100, 200\n300, 400')).toBe(1000)
        })

        it('should handle single amount', () => {
        expect(calculateTotal('500')).toBe(500)
        })

        it('should handle decimal amounts', () => {
        expect(calculateTotal('100.5, 200.3, 300.2')).toBe(601)
        })

        it('should handle amounts with extra whitespace', () => {
        expect(calculateTotal('  100  ,  200  ,  300  ')).toBe(600)
        })

        it('should handle empty strings between separators', () => {
        expect(calculateTotal('100,,200,,300')).toBe(600)
        })

        it('should handle leading and trailing separators', () => {
        expect(calculateTotal(',100,200,300,')).toBe(600)
        })

        it('should handle zero amounts', () => {
        expect(calculateTotal('0, 100, 0, 200')).toBe(300)
        })

        it('should handle negative amounts', () => {
        expect(calculateTotal('-100, 200, -50')).toBe(50)
        })
    })

    describe('invalid inputs', () => {
        it('should return 0 for empty string', () => {
        expect(calculateTotal('')).toBe(0)
        })

        it('should return 0 for string with only whitespace', () => {
        expect(calculateTotal('   ')).toBe(0)
        })

        it('should return 0 for string with only separators', () => {
        expect(calculateTotal(',,,\n\n')).toBe(0)
        })

        it('should return 0 when any amount is NaN', () => {
        expect(calculateTotal('100, abc, 300')).toBe(0)
        })

        it('should return 0 when any amount is invalid number', () => {
        expect(calculateTotal('100, invalid, 300')).toBe(0)
        })

        it('should return 0 for mixed valid and invalid amounts', () => {
        expect(calculateTotal('100, invalid, 300, 400')).toBe(0)
        })

        it('should return 0 for non-numeric strings', () => {
        expect(calculateTotal('hello, world')).toBe(0)
        })

        it('should handle partially invalid numbers by parsing what it can', () => {
        expect(calculateTotal('100, 12.34.56, 300')).toBeCloseTo(412.34, 10)
        })
    })

    describe('edge cases', () => {
        it('should handle very large numbers', () => {
        expect(calculateTotal('999999999, 1')).toBe(1000000000)
        })

        it('should handle very small decimal numbers', () => {
        expect(calculateTotal('0.000001, 0.000002')).toBe(0.000003)
        })

        it('should handle scientific notation', () => {
        expect(calculateTotal('1e6, 2e6')).toBe(3000000)
        })

        it('should handle Infinity', () => {
        expect(calculateTotal('Infinity, 100')).toBe(Infinity)
        })

        it('should handle -Infinity', () => {
        expect(calculateTotal('-Infinity, 100')).toBe(-Infinity)
        })
    })

    describe('real-world scenarios', () => {
        it('should handle typical token amounts in wei', () => {
        expect(calculateTotal('1000000000000000000, 2000000000000000000')).toBe(3000000000000000000)
        })

        it('should handle amounts copied from spreadsheet', () => {
        expect(calculateTotal('100\n200\n300\n400\n500')).toBe(1500)
        })

        it('should handle amounts with various decimal places', () => {
        expect(calculateTotal('1.1, 2.22, 3.333')).toBeCloseTo(6.653, 10)
        })
    })
}) 