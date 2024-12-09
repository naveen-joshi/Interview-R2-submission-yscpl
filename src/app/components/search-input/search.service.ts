import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { of, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchService {
  http = inject(HttpClient);
  apiURL = 'https://pmsharyana.com/jhgvbnmlk/location/landmarkSearch';

  constructor() {}

  getCity(term: string) {
    return of(term).pipe(
      switchMap((searchTerm) => {
        return this.http.post(this.apiURL, { search: searchTerm, city_id: 27 });
      })
    );
  }
}
