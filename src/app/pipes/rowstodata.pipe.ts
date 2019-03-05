import { Pipe, PipeTransform } from '@angular/core';

import { Utils } from '../utils/utils';

@Pipe({
    name: 'rowstodata'
})
export class RowstodataPipe implements PipeTransform {
    transform(rows: number[]): boolean[][] {
        return Utils.rowsToBin(rows);
    }
}
