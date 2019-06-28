import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

import { Painting } from '../../paintings/painting';
import { environment } from '../../../environments/environment';

@Injectable()
export class WebsocketService {
    private socket = io(environment.url);

    constructor() {}

    receiveStatus = () => {
        const observable = new Observable<any>(observer => {
            this.socket.emit('status');
            this.socket.on('status', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            }
        });

        return observable;
    }

    syncStrokes = () => {
        const observable = new Observable<any>(observer => {
            this.socket.emit('sync');
            this.socket.on('sync', (data) => {
                observer.next(data);
            });

            return () => {
                this.socket.disconnect();
            }
        });

        return observable;
    }

    uploadStroke = (painting: Painting) => {
        this.socket.emit('uploadStroke', painting.rows);
    }
}
