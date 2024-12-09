import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, switchMap } from 'rxjs';
import { SearchService } from './search.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule, NgClass],
  templateUrl: './search-input.component.html',
  styleUrl: './search-input.component.scss',
})
export class SearchInputComponent implements OnInit {
  public searchTerm = '';
  public searchSubject = new Subject<string>();
  searchService = inject(SearchService);
  public searchResults: any[] = [];
  showSearchResults = false;
  hoveredItem: any = null;

  @Output() searchValue = new EventEmitter<any>();

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(250),
        distinctUntilChanged(),
        switchMap((term) => {
          return this.searchService.getCity(term);
        })
      )
      .subscribe({
        next: (results: any) => {
          this.searchResults = results.data.landmarks;
          this.showSearchResults = true;
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  onInput() {
    if (this.searchTerm.trim() && this.searchTerm.length >= 3) {
      this.searchSubject.next(this.searchTerm);
    } else {
      this.searchSubject.next('');
      this.showSearchResults = false;
      this.searchValue.emit('');
    }
  }

  selectResult(item: any) {
    this.searchTerm = item.name;
    this.showSearchResults = false;
    this.searchValue.emit(item);
  }
}
