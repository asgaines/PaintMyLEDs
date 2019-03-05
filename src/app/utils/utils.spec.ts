import { Utils } from './utils';

describe('Utils.binRowSum', () => {
    it('should sum up rows of binary data', () => {
        let cases: {input: boolean[][], expected: number[]}[] = [
            {
                input: [
                    [true],
                ],
                expected: [
                    1,
                ],
            },
            {
                input: [
                    [true, true],
                ],
                expected: [
                    3,
                ],
            },
            {
                input: [
                    [false],
                ],
                expected: [
                    0,
                ],
            },
            {
                input: [
                    [true, false, true],
                    [false, false, true],
                    [true, true, true],
                ],
                expected: [
                    5,
                    1,
                    7,
                ],
            },
            {
                input: [
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
                ],
                expected: [
                    65535,
                    32767,
                    16383,
                    8191,
                    4095,
                    2047,
                    1023,
                    511,
                    255,
                    127,
                    63,
                    31,
                    15,
                    7,
                    3,
                    1,
                ],
            },
        ];

        for (let c of cases) {
            expect(Utils.binRowSum(c.input)).toEqual(c.expected);
        }
    });
});

describe('Utils.rowsToBin', () => {
    it('should deconstruct numbers to arrays of booleans', () => {
        let cases: {input: number[], expected: boolean[][]}[] = [
            {
                input: [
                    1,
                ],
                expected: [
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
                ],
            },
            {
                input: [
                    0,
                ],
                expected: [
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
                ],
            },
            {
                input: [
                    255,
                ],
                expected: [
                    [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true],
                ],
            },
            {
                input: [
                    65535,
                    32767,
                    16383,
                    8191,
                    4095,
                    2047,
                    1023,
                    511,
                    255,
                    127,
                    63,
                    31,
                    15,
                    7,
                    3,
                    1,
                ],
                expected: [
                    [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, true, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, true, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, true, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, true, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, false, true, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, true, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, true, true],
                    [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, true],
                ],
            },
        ];

        for (let c of cases) {
            expect(Utils.rowsToBin(c.input)).toEqual(c.expected);
        }
    });
});
