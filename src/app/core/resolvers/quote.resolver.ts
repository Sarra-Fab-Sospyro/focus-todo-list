import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { QuotesApiService } from '../services/quotes-api.service';
import { Quote } from '../models/quote.model';
import { catchError, EMPTY, filter, take } from 'rxjs';

export const quoteResolver: ResolveFn<Quote> = (route, state) => {

  const quoteService = inject(QuotesApiService);
  return quoteService.getQuoteOfDay().pipe(
    filter(quote => !!quote),
    take(1),
    catchError((err) => {
      console.error(`find ${err}`);
      return EMPTY
    })
  );
};
