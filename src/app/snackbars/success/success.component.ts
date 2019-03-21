import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
    successes: string[] = [];

    ngOnInit() {
        if (this.data.upload === 1) {
            this.successes.push('Successfully uploaded painting to grid');
        }

        if (this.data.save === 1) {
            this.successes.push('Successfully saved painting to archive');
        }
    }
}
