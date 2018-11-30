import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Observable } from 'rxjs';
import { log } from 'util';
import {CompanyService} from '../../../shared/service/company.service';

@Component({
  selector: 'app-company-create',
  templateUrl: './company-create.component.html',
  styleUrls: ['./company-create.component.css']
})
export class CompanyCreateComponent implements OnInit {
  phonePattern = "^\\(?(0)[0-9]{1}\\)?[ -]?[0-9]{2}[ -]?[0-9]{2}[ -]?[0-9][ -]?[0-9]{3}$";

  detailsForm = new FormGroup({
    companyName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    contactPerson: new FormControl(''),
    companyEmail: new FormControl('', [Validators.required, Validators.email, Validators.minLength(2)]),
    companyPhone: new FormControl('',[Validators.required, Validators.pattern(this.phonePattern)])
  });
  public companies;
  constructor(private _companyService: CompanyService) { }

  ngOnInit() {
  }
  onSubmit()
  {
    let result = this._companyService.saveCompany(this.detailsForm.value).subscribe(
      data => {
        console.log(data);
        alert("New Company Created Successfully.\n Company ID: " + data.CompanyID);
        this.detailsForm.reset();
      },
      err => {
        console.error("Error saving company!");
        console.log(err);
        if(err.error.errorCode == 409) {
          alert(err.error.errorMsg);
        }

      }
    );
  }

}
