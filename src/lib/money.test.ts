import { describe, expect, it } from 'vitest'
import { parseMoney } from './money'
describe('money', () => { it('parses paise exactly', () => { expect(parseMoney('1,250.50')).toBe(125050); expect(parseMoney('12.3')).toBe(1230); expect(parseMoney('2.999')).toBeNull() }) })
