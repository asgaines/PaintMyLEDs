import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {
    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
    successes: string[] = [];
    errors: string[] = [];

    ngOnInit() {
        if (this.data.upload === 1) {
            this.successes.push('Successfully uploaded painting to grid');
        } else if (this.data.upload === 0) {
            this.errors.push('Failed to upload painting to grid');
        }

        if (this.data.save === 1) {
            this.successes.push('Successfully saved painting to archive');
        } else if (this.data.save === 0) {
            this.errors.push('Failed to save painting to archive');
        }
    }
}
