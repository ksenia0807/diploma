import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from "primeng/floatlabel";
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';

interface Service {
  name: string;
}

interface CityFilter {
  name: string,
}

@Component({
  selector: 'app-client-main-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    DropdownModule,
    FloatLabelModule,
    DialogModule,
    SliderModule,
    ButtonModule,
  ],
  templateUrl: './client-main-page.component.html',
  styleUrl: './client-main-page.component.scss'
})
export class ClientMainPageComponent {

  public readonly services: Service[] = [
    { name: 'Уборка помещений' },
    { name: 'Химчистка' },
    { name: 'Ремонт бытовой техники' },
    { name: 'Ремонт и обслуживание автомобилей' },
    { name: 'Благоустроуство' },
    { name: 'Перевозка' },
    { name: 'Организация мероприятий' },
  ];

  public selectedService: Service | undefined;

  public readonly Cityfilters: CityFilter[] = [
    { name: 'Москва' },
    { name: 'МО' },
    { name: 'Санк-Петербург' },
    { name: 'Воронеж' },
    { name: 'Екатеринбург' },
    { name: 'Нижний Новгород' },
  ];

  public selectedCity!: CityFilter[];

  public priceRange: string = '';
  public showSlider: boolean = false;
  public selectedRange: number[] = [1000, 20000]; 
  public isCustomMode = false;

  public readonly priceOptions = [
    { label: 'Любая цена', value: 'any' },
    { label: 'До 1000 ₽', value: '0-1000' },
    { label: '1000-3000 ₽', value: '1000-3000' },
    { label: 'Выбрать вручную', value: 'custom' }
  ];

  public readonly ratingOptions = [
    { label: 'Любой рейтинг', value: 'any' },
    { label: '5', value: '5' },
    { label: 'От 4', value: '4' },
    { label: 'От 3', value: '3' }
  ];

  public ratingOption: number[] = [];

  public onPriceChange() {
    if (this.priceRange === 'custom') {
      if (this.isCustomMode && this.priceRange.includes('-')) {
        const [min, max] = this.priceRange.split('-').map(Number);
        this.selectedRange = [min, max];
      } else {
        this.selectedRange = [1000, 50000]; 
      }
      this.isCustomMode = true;
      this.showSlider = true;
    }
  }

  public applyRange() {
    this.priceRange = `${this.selectedRange[0]}-${this.selectedRange[1]}`;
    this.showSlider = false;
  }

  public getSelectedLabel(): string {
    if (!this.priceRange) return 'Выберите диапазон';

    if (this.priceRange.includes('-') && this.isCustomMode) {
      const [min, max] = this.priceRange.split('-');
      return `${min} - ${max} ₽`;
    }

    const found = this.priceOptions.find(opt => opt.value === this.priceRange);
    return found ? found.label : this.priceRange;
  }

  
    
}
