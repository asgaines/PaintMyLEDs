export module Utils {
    export function binRowSum(data: boolean[][]): number[] {
        let rows = [];

        for (let row of data) {
            let sum = 0;
            row = row.slice().reverse();

            for (let col = 0; col < row.length; col++) {
                if (row[col]) {
                    sum += 1 << col;
                }
            }

            rows.push(sum);
        }

        return rows;
    }

    export function rowsToBin(rows: number[]): boolean[][] {
        let data: boolean[][] = [];
        
        for (let row of rows) {
            let cols: boolean[] = Array.apply(null, Array(16)).map(_ => false);

            let i = 15;
            while (row > 0) {
                cols[i] = (row & 1) == 1;
                row = row >> 1;

                i--;
            }
            data.push(cols);
        }

        return data;
    }
}
