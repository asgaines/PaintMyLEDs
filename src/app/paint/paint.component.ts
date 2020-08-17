import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { APIService } from '../services/api/api.service';
import { WebsocketService } from '../services/websocket/websocket.service';
import { finalize, publishReplay, switchMap } from 'rxjs/operators';
import { Subject, Observable, empty } from 'rxjs';

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
    isMidStroke = false;
    apiCallComplete: boolean = true;
    dim = Math.min(window.innerWidth * 0.9, 800);
    painting: Painting = new Painting();

    live: boolean;
    LIVE_KEY: string = 'live';
    syncerSubscription;
    resume: Subject<any>;
    res: any;
    syncer: any;

    constructor(
        private _api: APIService,
        private _snackBar: MatSnackBar,
        private _ws: WebsocketService
    ) { }

    ngOnInit() {
        this.gridData = this.createEmptyGrid(16, 16);
        this.live = JSON.parse(localStorage.getItem(this.LIVE_KEY)) === true;
        this._ws.syncStrokes().subscribe(
            res => {
                if (this.live) {
                    // If the artist is already painting a new stroke when former stroke was successful (or
                    // another painter's stroke is complete), do not update so as not to interrupt
                    if (!this.isMidStroke) {
                        this.gridData = Utils.rowsToBin(res.data);
                    }
                }
            },
            err => console.error(err));
    }

    gridUpdated(data: boolean[][]) {
        this.painting.rows = Utils.binRowSum(data);

        if (this.live) {
            this.submit(false);
        }
    }

    isMidStrokeUpdated(isMidStroke: boolean) {
        this.isMidStroke = isMidStroke;
    }

    liveToggled(evt: MatSlideToggleChange) {
        this.live = evt.checked;
        localStorage.setItem('live', JSON.stringify(this.live));
    }

    createEmptyGrid(rows: number, cols: number): boolean[][] {
        return Array.apply(null, Array(rows)).map(_ => Array.apply(null, Array(cols)).map(_ => false));
    }

    submit = (save: boolean) => {
        this.apiCallComplete = false;

        this._api.postPainting(this.painting, save)
            .pipe(finalize(() => this.apiCallComplete = true))
            .subscribe(
                res => {
                    if (save) {
                        this.displaySuccess(res)
                    }

                    this._ws.uploadStroke(this.painting);
                },
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