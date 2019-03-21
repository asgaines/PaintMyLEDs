import { Component, OnInit } from '@angular/core';
import {
    MatSnackBar,
    PageEvent,
} from '@angular/material';

import { finalize } from 'rxjs/operators';

import { APIService } from '../services/api/api.service';
import { Painting } from '../paintings/painting';
import { Utils } from '../utils/utils';
import { SuccessComponent } from '../snackbars/success/success.component';
import { ErrorComponent } from '../snackbars/error/error.component';

@Component({
  selector: 'paintings',
  templateUrl: './paintings.component.html',
  styleUrls: ['./paintings.component.scss']
})
export class PaintingsComponent implements OnInit {
    loaded: boolean = false;
    paintings: Painting[];
    visiblePaintings: Painting[];
    dim = Math.min(window.innerWidth * 0.9, 800);
    replayCallComplete: boolean = true;
    pageSizeOptions: number[] = [1, 5, 15, 50, 100];
    pageState: PageEvent = {
        pageIndex: 0,
        pageSize: 15,
        length: 0,
    };

    constructor(
        private _api: APIService,
        private _snackBar: MatSnackBar) { }

    ngOnInit() {
        this.fetchPaintings()
    }

    fetchPaintings = () => {
        this.loaded = false;

        this._api.getPaintings()
            .pipe(finalize(() => this.loaded = true))
            .subscribe(
                res => {
                    this.paintings = res.slice();
                    this.paginate(this.pageState);
                },
                err => console.error('Error fetching paintings:', err))
    }

    replay = (painting: Painting) => {
        this.replayCallComplete = false;

        this._api.postPainting({
            rows: painting.rows, // TODO: pass the pure painting
        }, false)
            .pipe(finalize(() => this.replayCallComplete = true))
            .subscribe(
                res => this.displaySuccess(res),
                err => {
                    console.error(err);
                    this.displayError(err.data);
                });
    }

    displaySuccess = (data) => {
        this._snackBar.openFromComponent(SuccessComponent, {
            duration: 2500,
            data: data,
        })
    }


    displayError = (data) => {
        this._snackBar.openFromComponent(ErrorComponent, {
            duration: 10000,
            data: data,
        })
    }

    paginate = (event: PageEvent) => {
        const start = event.pageSize * event.pageIndex;
        const end = event.pageSize * (event.pageIndex + 1);

        this.visiblePaintings = this.paintings.slice(start, end);
        this.pageState = event;
    }
}
