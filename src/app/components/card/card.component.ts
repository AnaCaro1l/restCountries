import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, ChevronLeft, ChevronRight } from 'lucide-angular';

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
  imports: [CommonModule, RouterModule, LucideAngularModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  readonly chevronLeft = ChevronLeft;
  readonly chevronRight = ChevronRight;
  apiUrl = 'http://localhost:3333/countries';

  countries: Country[] = [];
  filteredCountries: Country[] = [];
  isLoading = true;

  @Input() searchTerm: string | null = null;
  @Input() region: string | null = null;

  page = 1;
  pageSize = 20;
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

  nextPage() {
    if (this.page * this.pageSize < this.total) {
      this.page++;
      this.scrollToTop();
      this.fetchCountries();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.scrollToTop();
      this.fetchCountries();
    }
  }

  private resetPagination() {
    this.page = 1;
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.total / this.pageSize));
  }

  private scrollToTop() {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
