import { Component, OnInit } from '@angular/core';
import {CompanyService} from '../../../shared/service/company.service';
import {Company, DuplicateCompanies} from '../../../shared/Models/company';


@Component({
  selector: 'app-cleanup',
  templateUrl: './cleanup.component.html',
  styleUrls: ['./cleanup.component.css']
})
export class CleanupComponent implements OnInit {
  companies: Array<DuplicateCompanies>;
  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getDuplicateCompanies().subscribe(data => {
      this.companies = data;
    });
  }

}
