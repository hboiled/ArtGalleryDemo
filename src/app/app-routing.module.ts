import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./curatorpanel/auth/auth-guard";

import { CuratorpanelComponent } from "./curatorpanel/curatorpanel.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { FormComponent } from './curatorpanel/form/form.component';
import { AuthComponent } from './curatorpanel/auth/auth.component';
import { PrivacyComponent } from './static_pages/privacy/privacy.component';
import { ContactComponent } from './static_pages/contact/contact.component';


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
  { path: "contact", component: ContactComponent },
  { path: "privacy", component: PrivacyComponent },
  { path: "auth", component: AuthComponent },
  { path: '**', redirectTo: "/gallery" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
