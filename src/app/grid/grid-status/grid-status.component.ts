import { Component, OnInit } from '@angular/core';

import { finalize } from 'rxjs/operators';

import { APIService } from '../../services/api/api.service';
import { WebsocketService } from '../../services/websocket/websocket.service';

@Component({
  selector: 'grid-status',
  templateUrl: './grid-status.component.html',
  styleUrls: ['./grid-status.component.scss']
})
export class GridStatusComponent implements OnInit {
    loaded: boolean = false;
    online: boolean = false;

    constructor(
        private _api: APIService,
        private ws: WebsocketService
    ) {
        this.ws.receiveStatus().subscribe(
            res => {
                this.online = res.online;
                this.loaded = true;
            },
            err => console.error(err));
    }

    ngOnInit() {
    }
}
