import { Component, OnInit, ViewChild,Input } from '@angular/core';
import { MatPaginator, MatTableDataSource  } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';

import {CompanyService} from '../../../shared/service/company.service';
import {Company} from '../../../shared/Models/company';

import { CompanyCreateComponent } from '../company-create/company-create.component';
import { CompanyEditComponent } from '../company-edit/company-edit.component';

@Component({
  selector: 'app-company-manage',
  templateUrl: './company-manage.component.html',
  styleUrls: ['./company-manage.component.css']
})
export class CompanyManageComponent implements OnInit {
  public companies;

  constructor(private _companyService: CompanyService,private router: Router) { }
  displayedColumns: string[] = ['position', 'companyName', 'companyContact', 'companyEmail', 'companyPhone', 'actionsColumn'];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource = new MatTableDataSource<CompanyElement>();

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.getCompany();
    console.log(this.companies);

  }
  getCompany() {
    this._companyService.getAllCompany().subscribe(
      // the first argument is a function which runs on success
      data => {
        this.companies = data;
        this.dataSource.data = this.companies;
        console.log(this.companies);

      },
      // the second argument is a function which runs on error
      err => console.error(err),
      // the third argument is a function which runs on completion
      () => console.log('done loading companies')
    );
  }
  editCompany(companyId) {
    this.router.navigate([`/edit/${companyId}`]);
  }
  remove(id) {
   console.log(id);
    if (confirm('Are you sure to delete this record ?') == true) {
      this._companyService.deleteCompany(id)
      .subscribe(x => {
        this._companyService.getAllCompany().subscribe(data => {
          this.companies = data;
        });

      },
          // the second argument is a function which runs on error
          err => console.error(err),
          // the third argument is a function which runs on completion
          () => console.log('deleted company'));
    }
  }


}
export interface CompanyElement {
  position: number;
  companyName: string;
  companyContact: string;
  companyEmail: string;
  companyPhone: string;
}
