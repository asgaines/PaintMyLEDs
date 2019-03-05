import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'timesince'
})
export class TimesincePipe implements PipeTransform {
    transform(value: string): string {
        return moment(value).fromNow();
    }
}
