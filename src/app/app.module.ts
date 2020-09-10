import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CuratorpanelComponent } from './curatorpanel/curatorpanel.component';
import { GalleryComponent } from './gallery/gallery.component';
import { ArtDisplayComponent } from './gallery/art-display/art-display.component';
import { ArtDisplayInfoComponent } from './gallery/art-display/art-display-info/art-display-info.component';
import { ListComponent } from './curatorpanel/list/list.component';
import { FormComponent } from './curatorpanel/form/form.component';
import { ItemDisplayComponent } from './curatorpanel/list/item-display/item-display.component';
import { FooterComponent } from './footer/footer.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './curatorpanel/auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CuratorpanelComponent,
    GalleryComponent,
    ArtDisplayComponent,
    ArtDisplayInfoComponent,
    ListComponent,
    FormComponent,
    ItemDisplayComponent,
    FooterComponent,
    ImageViewerComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }