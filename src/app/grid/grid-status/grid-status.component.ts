import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { finalize } from 'rxjs/operators';

import { APIService } from '../../services/api/api.service';
import { WebsocketService } from '../../services/websocket/websocket.service';

export interface DialogData {
    online: boolean;
}

@Component({
  selector: 'grid-status',
  templateUrl: './grid-status.component.html',
  styleUrls: ['./grid-status.component.scss']
})
export class GridStatusComponent implements OnInit {
    loaded: boolean = false;
    online: boolean = false;

    constructor(
        public dialog: MatDialog,
        private _api: APIService,
        private _ws: WebsocketService
    ) {
        this._ws.receiveStatus().subscribe(
            res => {
                this.online = res.online;
                this.loaded = true;
            },
            err => console.error(err));
    }

    ngOnInit() {}

    openDialog = () => {
        const dialogRef = this.dialog.open(Dialog, {
            width: '300px',
            data: {
                online: this.online,
            },
        });
    }
}

@Component({
    selector: 'status-dialog',
    templateUrl: './dialog.component.html',
})
export class Dialog {
    constructor(
        public dialogRef: MatDialogRef<Dialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData
    ) {}
}
