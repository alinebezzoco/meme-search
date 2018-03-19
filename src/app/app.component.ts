import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchService]
})
export class AppComponent {

  searchTerm$ = new Subject<string>();


  title = 'Welcome to Meme Search';
  results: Object;

  constructor(
    private searchService: SearchService
  ) {
    this.callSearchService();
  }

  callSearchService() {
    this.searchService.search(this.searchTerm$)
      .subscribe(results => {
        this.results = results.data;
        console.log(this.results);
      });
  }
}

