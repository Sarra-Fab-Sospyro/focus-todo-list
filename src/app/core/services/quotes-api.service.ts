import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Quote, RootInterface } from '../models/quote.model';

@Injectable({
  providedIn: 'root'
})
export class QuotesApiService {
  private quotesApiUrl: string = "/api/api/qotd";
  private http = inject(HttpClient);

  getQuoteOfDay(): Observable<Quote> {
    return this.http.get<RootInterface>(this.quotesApiUrl).pipe(
      map(({quote}) => quote)
    );
  }

}
