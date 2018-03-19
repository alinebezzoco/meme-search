import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class SearchService {

  baseUrl: string = 'http://api.giphy.com/v1/gifs/';
  queryUrl: string = 'search?';
  apiKey: string = 'api_key=dc6zaTOxFJmzC&q=';
  term: HTMLInputElement
  
  constructor(
    private http: Http
  ) { }

  search(terms: Observable<string>) {
    return terms.debounceTime(400)
      .distinctUntilChanged()
      .switchMap(term => this.searchEntries(term));
  }

  searchEntries(term) {
    return this.http
      .get(this.baseUrl + this.queryUrl + this.apiKey + term)
      .map(res => res.json());
  }

}
