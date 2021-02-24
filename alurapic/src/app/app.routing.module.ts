import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailComponent } from './photos/photo-detail/photo-detail.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoResolver } from './photos/photos.resolver';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'fotos/:userName',
        component: PhotoListComponent,
        resolve: {
            photos: PhotoResolver
        }
    },
    {
        path: 'p/:idPhoto',
        component: PhotoDetailComponent
    },
    {
        path: 'new-photo',
        component: PhotoFormComponent,
        canActivate: [AuthGuard]
    }
    // {
    //     path: '**',
    //     component: NotFoundComponent
    // }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]

})
export class AppRoutingModule {}
