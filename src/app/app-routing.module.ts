import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./curatorpanel/auth/auth-guard";

import { CuratorpanelComponent } from "./curatorpanel/curatorpanel.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { FormComponent } from './curatorpanel/form/form.component';
import { AuthComponent } from './curatorpanel/auth/auth.component';


const routes: Routes = [
  { path: "", redirectTo: "/gallery", pathMatch: "full" },
  { path: "curator", component: CuratorpanelComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: "new", pathMatch: "full" },
      { path: 'new', component: FormComponent },      
      {
        path: ':id/edit',
        component: FormComponent,        
      }
    ] },
  { path: "gallery", component: GalleryComponent },
  { path: "auth", component: AuthComponent },
  { path: '**', redirectTo: "/gallery" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
