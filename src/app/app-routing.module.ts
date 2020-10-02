import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "./curatorpanel/auth/auth-guard";
import { CuratorGuard } from "./curatorpanel/curator-guard";

import { CuratorpanelComponent } from "./curatorpanel/curatorpanel.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { ListComponent } from "./curatorpanel/list/list.component";
import { FormComponent } from './curatorpanel/list/form/form.component';
import { AuthComponent } from './curatorpanel/auth/auth.component';
import { PrivacyComponent } from './static_pages/privacy/privacy.component';
import { ContactComponent } from './static_pages/contact/contact.component';
import { BrowseComponent } from './gallery/browse/browse.component';


const routes: Routes = [
  { path: "", redirectTo: "/gallery", pathMatch: "full" },
  {
    path: "curator", component: CuratorpanelComponent,
    canActivate: [CuratorGuard],
    children: [
      {
        path: 'painting', component: ListComponent,
        children: [
          { path: 'new', component: FormComponent },
          {
            path: ':id/edit',
            component: FormComponent,
          }
        ]
      },
      {
        path: 'sculpture', component: ListComponent,
        children: [
          { path: 'new', component: FormComponent },
          {
            path: ':id/edit',
            component: FormComponent,
          }
        ]
      },      
    ]
  },
  {
    path: "gallery", component: GalleryComponent
    // , children: [
    //     { path: '', redirectTo: "new", pathMatch: "full" },
    //     { path: 'browse', component: BrowseComponent },
    //   ] 
  },
  { path: "contact", component: ContactComponent },
  { path: "privacy", component: PrivacyComponent },
  {
    path: "auth", component: AuthComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: "/gallery" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
