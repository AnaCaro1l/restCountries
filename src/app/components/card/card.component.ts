import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Country {
  name: { common: string };
  population: number;
  region: string;
  capital?: string[];
  flags?: { svg?: string; png?: string; alt?: string };
  cca3?: string;
}

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  apiUrl = 'http://localhost:3333/countries';

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  isLoading = true;

  @Input() searchTerm: string | null = null;
  @Input() region: string | null = null;

  // Pagination state
  page = 1;
  pageSize = 12;
  total = 0;

  ngOnInit() {
    this.fetchCountries();
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('searchTerm' in changes || 'region' in changes) {
      this.resetPagination();
      this.fetchCountriesDebounced();
    }
  }

  private debounceTimer: any;
  fetchCountriesDebounced() {
    clearTimeout(this.debounceTimer);
    this.debounceTimer = setTimeout(() => this.fetchCountries(), 300);
  }

  fetchCountries() {
    this.isLoading = true;
    const url = new URL(this.apiUrl);
  if (this.searchTerm) url.searchParams.set('name', this.searchTerm);
  if (this.region) url.searchParams.set('region', this.region);
    url.searchParams.set('page', String(this.page));
    url.searchParams.set('pageSize', String(this.pageSize));
  fetch(url.toString())
      .then((response) => {
        const totalHeader = response.headers.get('X-Total-Count');
        this.total = totalHeader ? parseInt(totalHeader, 10) : 0;
        return response.json();
      })
      .then((data: Country[]) => {
        this.countries = data;
        this.filteredCountries = data;
        this.isLoading = false;
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
        this.isLoading = false;
      });
  }

  // Pagination actions
  nextPage() {
    if (this.page * this.pageSize < this.total) {
      this.page++;
      this.fetchCountries();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.fetchCountries();
    }
  }

  // Reset pagination when filters change
  private resetPagination() {
    this.page = 1;
  }

  // Derived values
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }
}
