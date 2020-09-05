import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CuratorpanelComponent } from "./curatorpanel/curatorpanel.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { FormComponent } from './curatorpanel/form/form.component';


const routes: Routes = [
  { path: "", redirectTo: "/gallery", pathMatch: "full" },
  { path: "curator", component: CuratorpanelComponent,
    children: [
      { path: '', redirectTo: "new", pathMatch: "full" },
      { path: 'new', component: FormComponent },      
      {
        path: ':id/edit',
        component: FormComponent,
        //resolve: [RecipesResolver]
      }
    ] },
  { path: "gallery", component: GalleryComponent },
  { path: '**', redirectTo: "/gallery" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
