import { Component, input } from '@angular/core';
@Component({
  selector: 'app-quote',
  imports: [],
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.scss']
})
export class QuoteComponent  {

  quote = input<{ author: string, body: string }>();

}
