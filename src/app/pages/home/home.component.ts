import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { LucideAngularModule, Moon, Search, Sun } from 'lucide-angular';
import { MatButtonModule } from '@angular/material/button';

interface Region {
    name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    LucideAngularModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
    DropdownModule,
    FormsModule,
    CardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly sun = Sun;
  readonly moon = Moon;
  readonly search = Search;
  theme: 'light' | 'dark' = 'light';

  searchForm = new FormGroup({
    search: new FormControl(''),
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
}
