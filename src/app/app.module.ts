import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatInputModule,
  MatListModule,
  MatToolbarModule,
  MatTableModule,
  MatIconModule,
  MatPaginatorModule,

} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CompanyCreateComponent } from './components/company-create/company-create.component';
import { CompanyManageComponent } from './components/company-manage/company-manage.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CleanupComponent } from './components/cleanup/cleanup.component';

@NgModule({
  declarations: [
    AppComponent,
    CompanyCreateComponent,
    CompanyManageComponent,
    CompanyEditComponent,
    CleanupComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatPaginatorModule,
    MatDialogModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


