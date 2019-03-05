import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaintComponent } from './paint/paint.component';
import { PaintingsComponent } from './paintings/paintings.component';

const routes: Routes = [
    {
        path: '',
        component: PaintComponent,
    },
    {
        path: 'paintings',
        component: PaintingsComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
