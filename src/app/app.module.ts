import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ToolbarComponent } from './shared/toolbar/toolbar.component';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './shared/footer/footer.component';
import { VillagersListComponent } from './villagers/villagers-list.component';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

import { MatTableModule } from '@angular/material/table';

import {MaterialModule} from '../material.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';

import { StatusPipe } from './shared/status.pipe';
import { VillagerDetailDialog } from './villagers/villager-detail/villager-detail-dialog.component';
import { VillagerFormComponent } from './villagers/villager-form/villager-form.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    FooterComponent,
    VillagersListComponent,
    StatusPipe,
    WelcomeComponent,
    VillagerDetailDialog,
    VillagerFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
