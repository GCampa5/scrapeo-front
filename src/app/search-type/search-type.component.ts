import { Component } from '@angular/core';
import { faDatabase } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-search-type',
  templateUrl: './search-type.component.html',
  styleUrls: ['./search-type.component.scss']
})
export class SearchTypeComponent {
  faDatabase = faDatabase;
  faSearch = faSearch;

}
