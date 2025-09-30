import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent {
  isLoading = true;
  country: any;

  private apiUrl = 'http://localhost:3333/countries';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchDetails(id);
      }
    });
  }

  fetchDetails(id: string) {
    this.isLoading = true;
    fetch(`${this.apiUrl}/${id}`)
      .then((r) => r.json())
      .then((data) => {
        this.country = this.mapCountry(data);
        this.isLoading = false;
      })
      .catch((err) => {
        console.error(err);
        this.isLoading = false;
      });
  }

  mapCountry(c: any) {
    const currencies = c.currencies
      ? Object.values(c.currencies)
          .map((v: any) => v?.name)
          .filter(Boolean)
          .join(', ')
      : '-';
    const languages = c.languages
      ? Object.values(c.languages).join(', ')
      : '-';
    const nativeName = c.name?.nativeName
      ? (Object.values(c.name.nativeName)[0] as any)?.common
      : c.name?.common;

    return {
      name: c.name?.common,
      nativeName,
      population: c.population,
      region: c.region,
      subregion: c.subregion,
      capital: c.capital?.[0] || '-',
      tld: c.tld?.[0] || '-',
      currencies,
      languages,
      flag: c.flags?.svg || c.flags?.png,
      borders: (c.borderCountries || []).map((b: any) => ({ code: b.code, name: b.name })),
      code: c.cca3,
    };
  }

  goBack() {
    this.router.navigateByUrl('/');
  }

  goToBorder(code: string) {
    this.router.navigate(['/details', code]);
  }
}
