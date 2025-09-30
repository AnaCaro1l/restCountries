import { Component, HostBinding } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { LucideAngularModule, Moon, Sun, Search } from 'lucide-angular';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgFor } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

interface Region {
    name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatButtonModule,
    LucideAngularModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    DropdownModule,
    FormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly sun = Sun;
  readonly moon = Moon;
  readonly search = Search;
  theme: 'light' | 'dark' = 'light';

  searchForm = new FormGroup({
    email: new FormControl(''),
  });

  regions: Region[] | undefined;

  selectedRegion: Region | undefined;

  ngOnInit() {
    this.regions = [
      { name: 'Africa' },
      { name: 'Americas' },
      { name: 'Asia' },
      { name: 'Europe' },
      { name: 'Oceania' },
    ];
  }

  @HostBinding('class')
  get themeClass() {
    return `theme-${this.theme}`;
  }

  toggleTheme() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
  }
}
