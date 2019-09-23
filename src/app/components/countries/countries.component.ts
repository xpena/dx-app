import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css']
})

export class CountriesComponent implements OnInit {

  loading: boolean;
  filterType: any[];
  filterText: string;
  filterSelected: any;
  countriesList: any[];
  countryItem: any;
  languagesList: any[];
  regionsList: any[];

  constructor(private cntService: CountriesService, private modalService: NgbModal) {
    this.loading = false;
    this.filterType = [
      { name: 'Name', type: 'name'},
      { name: 'Language', type: 'lang'},
      { name: 'Continent', type: 'region'},
      { name: 'Capital city', type: 'capital'},
      { name: 'Calling code', type: 'callingcode'}
    ];
    this.languagesList = [
      { code: '', name: 'Select a Language'},
      { code: 'es', name: 'Spanish'},
      { code: 'en', name: 'English'},
      { code: 'ja', name: 'Japanese'},
      { code: 'fr', name: 'French'}
    ];
    this.regionsList = [
      { code: '', name: 'Select a Region'},
      { code: 'americas', name: 'America'},
      { code: 'europe', name: 'Europa'},
      { code: 'africa', name: 'Africa'},
      { code: 'asia', name: 'Asia'},
      { code: 'oceania', name: 'Oceania'}
    ];
    this.filterSelected = this.filterType[0];
    this.getCountries();
  }

  ngOnInit() {
  }

  getCountries() {
    this.loading = true;
    this.countriesList = [];
    this.cntService.getCountries().subscribe((data: any) => {
      this.countriesList = data;
      this.loading = false;
    });
  }

  getFilter(text: string) {
    if ( text.length > 0) {
      this.loading = true;
      this.countriesList = [];
      this.cntService.getFilter(this.filterSelected.type, text).subscribe((data: any) => {
        this.countriesList = data;
        this.loading = false;
        this.filterText = '';
      },
      (error) => {
        this.loading = false;
        //this.filterText = '';
      });
    }
    else {
      this.getCountries();
    }
  }

  getCountry(code: string, content: any) {
    this.loading = true;
    this.cntService.getCountry(code).subscribe((data: any) => {
      this.loading = false;
      this.countryItem = data;

      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg'}).result.then((result) => {
        console.log(`${result}`);
      });

    });
  }

  selectFilter(filter: any) {
    this.filterText = '';
    this.filterSelected = filter;
    this.getFilter(this.filterText);
  }

}
