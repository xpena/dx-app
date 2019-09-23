import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { CountriesComponent } from './components/countries/countries.component';

import { HttpClientModule} from '@angular/common/http';
import { CountriesService } from './services/countries.service';
import { LoadingComponent } from './components/shared/loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    CountriesComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAP_VgpAEKLPjLylttcoic6vEP7cizks3k'
    }),
    NgxPaginationModule,
    AppRoutingModule
  ],
  exports: [CountriesComponent],
  providers: [CountriesService],
  bootstrap: [AppComponent, CountriesComponent]
})
export class AppModule { }
