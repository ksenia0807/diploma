import { CommonModule } from '@angular/common';
import { SelectItemGroup } from 'primeng/api';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

interface City {
  name: string;
  code: string;
}

@Component({
  selector: 'app-client-main-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    DropdownModule
  ],
  templateUrl: './client-main-page.component.html',
  styleUrl: './client-main-page.component.scss'
})
export class ClientMainPageComponent {

    cities: City[] = [];

    selectedCity: City | undefined;

    ngOnInit() {
        this.cities = [
            { name: 'New York', code: 'NY' },
            { name: 'Rome', code: 'RM' },
            { name: 'London', code: 'LDN' },
            { name: 'Istanbul', code: 'IST' },
            { name: 'Paris', code: 'PRS' }
        ];
    }
}
