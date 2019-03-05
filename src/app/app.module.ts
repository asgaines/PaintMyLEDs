import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import {
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSnackBarModule,
} from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
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
import { SuccessComponent } from './snackbars/success/success.component';
import { ErrorComponent } from './snackbars/error/error.component';
import { TimesincePipe } from './pipes/timesince.pipe';
import { RowstodataPipe } from './pipes/rowstodata.pipe';

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
    ],
    entryComponents: [
        SuccessComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpModule,
        FormsModule,
        BrowserAnimationsModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        MatSidenavModule,
        MatToolbarModule,
        MatSnackBarModule,
        MatPaginatorModule,
        FlexLayoutModule,
        HttpClientModule,
    ],
    providers: [
        APIService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
