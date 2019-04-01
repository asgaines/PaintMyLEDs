import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { environment } from '../../../environments/environment';

@Injectable()
export class WebsocketService {
    private socket = io(environment.url);

    constructor() {}

    receiveStatus = () => {
        const observable = new Observable<any>(observer => {
            this.socket.emit('status');
            this.socket.on('status', (data) => {
                console.log(data);
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            }
        });

        return observable;
    }
}
