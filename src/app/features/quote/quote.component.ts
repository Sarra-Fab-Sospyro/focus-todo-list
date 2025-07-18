import { Component, inject, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { QuotesApiService } from '../../core/services/quotes-api.service';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-quote',
  imports: [AsyncPipe],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.scss'
})
export class QuoteComponent implements OnInit {

  private quoteService = inject(QuotesApiService);
  quote$!: Observable<{author: string, body: string}>;

  ngOnInit(): void {
    this.quote$ = this.quoteService.getQuoteOfDay();
  }
}
