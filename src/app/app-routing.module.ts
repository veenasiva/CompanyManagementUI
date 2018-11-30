import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ CompanyCreateComponent} from './components/company-create/company-create.component'
import { CompanyManageComponent } from './components/company-manage/company-manage.component';
import { CompanyEditComponent } from './components/company-edit/company-edit.component';
import { CleanupComponent } from './components/cleanup/cleanup.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/create', pathMatch: 'full' },
  { path: 'manage',  component: CompanyManageComponent  },
  {path: 'create', component: CompanyCreateComponent},
  { path: 'edit/:id', component: CompanyEditComponent },
   { path: 'tools',   component: CleanupComponent  },
];


@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
  
})
export class AppRoutingModule { }
