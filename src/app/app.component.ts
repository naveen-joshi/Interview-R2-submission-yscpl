import { Component } from '@angular/core';
import { SearchInputComponent } from './components/search-input/search-input.component';

@Component({
  selector: 'app-root',
  imports: [SearchInputComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'test';
  showSubmit = false;

  setValue(item: any) {
    if (item.name) {
      this.showSubmit = true;
    } else {
      this.showSubmit = false;
    }
  }

  submitResult() {}
}
