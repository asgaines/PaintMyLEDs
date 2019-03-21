import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';

import { APIService } from '../services/api/api.service';
import { finalize } from 'rxjs/operators';

import { SuccessComponent } from '../snackbars/success/success.component';
import { ErrorComponent } from '../snackbars/error/error.component';
import { Utils } from '../utils/utils';
import { Painting } from '../paintings/painting';

@Component({
  selector: 'paint',
  templateUrl: './paint.component.html',
  styleUrls: ['./paint.component.scss']
})
export class PaintComponent implements OnInit {
    gridData: boolean[][];
    apiCallComplete: boolean = true;
    showSuccess: boolean;
    dim = Math.min(window.innerWidth * 0.9, 800);
    painting: Painting = new Painting();

    constructor(
        private _api: APIService,
        private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.gridData = this.createEmptyGrid(16, 16);
    }

    gridUpdated = (data: boolean[][]) => {
        this.painting.rows = Utils.binRowSum(data);
    }

    createEmptyGrid = (rows: number, cols: number): boolean[][] => {
        return Array.apply(null, Array(rows)).map(_ => Array.apply(null, Array(cols)).map(_ => false))
    }

    submit = () => {
        this.apiCallComplete = false;

        this._api.postPainting(this.painting, true)
            .pipe(finalize(() => this.apiCallComplete = true))
            .subscribe(
                res => this.displaySuccess(res),
                err => {
                    console.error(err);
                    this.displayError(err.data);
                });
    }

    reset = () => {
        this.gridData = this.createEmptyGrid(16, 16);
        this.gridUpdated(this.gridData);
    }

    displaySuccess = (data) => {
        this._snackBar.openFromComponent(SuccessComponent, {
            duration: 2500,
            data: data,
        });
    }

    displayError = (data) => {
        this._snackBar.openFromComponent(ErrorComponent, {
            duration: 10000,
            data: data,
        });
    }
}
