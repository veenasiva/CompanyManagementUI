import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm,FormControl,FormGroupDirective,Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

import {CompanyService} from '../../../shared/service/company.service';
import {Company} from '../../../shared/Models/company';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.css']
})

export class CompanyEditComponent implements OnInit, OnDestroy {
  public errorMsg;
  company: Company = new Company();

  sub: Subscription;

  
  constructor(private route: ActivatedRoute,
    private router: Router,
    private companyService: CompanyService)
    { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const isNumber = Number(params['id']);
      const id=params['id'];
      if (isNumber) {
        console.log("with id param");
        this.companyService.getCompany(id).subscribe((company: any) => {
          if (company) {
            this.company = company;
            this.company.IsDuplicate=false;
          } else {
            console.log(
              `Company with id '${id}' not found, returning to list`
            );
            this.gotoList();
          }
        });
      }
     else
      {
        console.log("with name param");
        this.companyService.getDuplicateCompany(id).subscribe((company: any) => {
          if (company) {
            this.company = company;
            this.company.IsDuplicate=true;
            
          } else {
            console.log(
              `Company with name '${name}' not found, returning to list`
            );
            this.gotoList();
          }
        });
      }
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  gotoList() {
    if(!this.company.IsDuplicate)
      this.router.navigate(['/manage']);
    else
      this.router.navigate(['/tools']);
  }
  save(form: any) {
    console.log(
      `Company in edit  '${form.CompanyEmail}'`
    );
    this.companyService.saveCompany(form).subscribe(
      result => {
        this.gotoList();
      },
      error => this.errorMsg=<any>error,() => console.log( `Received error response  '${this.errorMsg}'`)
    );
  }
  remove(id: number) {
   
    if (confirm('Are you sure to delete this record ?') == true) {
      this.companyService.deleteCompany(id)
      .subscribe(x => {
        this.companyService.getAllCompany().subscribe(data => {
          this.gotoList();
        });

      });
    }
  }
}
