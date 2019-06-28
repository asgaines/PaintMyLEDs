import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
} from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaintComponent } from './paint/paint.component';
import { PaintingsComponent } from './paintings/paintings.component';
import { GridComponent } from './grid/grid.component';
import { APIService } from './services/api/api.service';
import { WebsocketService } from './services/websocket/websocket.service';
import { SuccessComponent } from './snackbars/success/success.component';
import { ErrorComponent } from './snackbars/error/error.component';
import { TimesincePipe } from './pipes/timesince.pipe';
import { RowstodataPipe } from './pipes/rowstodata.pipe';
import { NavbarComponent } from './navbar/navbar.component';
import { GridStatusComponent } from './grid/grid-status/grid-status.component';
import { Dialog } from './grid/grid-status/grid-status.component';
import { LoadingAnimationComponent } from './loading-animation/loading-animation.component';

@NgModule({
    declarations: [
        AppComponent,
        PaintComponent,
        PaintingsComponent,
        GridComponent,
        SuccessComponent,
        ErrorComponent,
        TimesincePipe,
        RowstodataPipe,
        NavbarComponent,
        GridStatusComponent,
        Dialog,
        LoadingAnimationComponent,
    ],
    entryComponents: [
        SuccessComponent,
        ErrorComponent,
        Dialog,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSlideToggleModule,
        FlexLayoutModule,
        HttpClientModule,
    ],
    providers: [
        APIService,
        WebsocketService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
