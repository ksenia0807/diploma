import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from "primeng/floatlabel";
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { ClientProfileService } from 'src/app/services/client-profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';

interface Service {
  name: string;
}

interface CityFilter {
  name: string,
}

@Component({
  selector: 'app-client-page-header',
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
  templateUrl: './client-page-header.component.html',
  styleUrl: './client-page-header.component.scss'
})
export class ClientPageHeaderComponent implements OnInit{

  @Output() filtersChanged = new EventEmitter<{
    city?: string;
    priceRange?: { min: number; max: number };
    rating?: number;
  }>();

  currentClient?: Client;
  clients: Client[] = [];

  ngOnInit() {
    const clientId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCurrentClient(clientId);
  }

  private loadCurrentClient(id: number) {
    this.clientProfileService.getClientById(id).subscribe({
      next: (client) => {
        this.currentClient = client;
      },
      error: () => {
        console.error('Ошибка загрузки данных клиента');
      }
    });
  }

  public applyFilters() {
    const filters = {
      city: this.selectedCity?.name,
      priceRange: this.getPriceRange(),
      rating: this.getRatingValue()
    };
    this.filtersChanged.emit(filters);
  }

  private getPriceRange() {
    if (this.priceRange === 'any') return undefined;
    if (this.priceRange === 'custom') {
      return { min: this.selectedRange[0], max: this.selectedRange[1] };
    }
    if (this.priceRange.includes('-')) {
      const [min, max] = this.priceRange.split('-').map(Number);
      return { min, max };
    }
    return undefined;
  }

  private getRatingValue() {
    if (!this.ratingOption) return undefined;
    return Number(this.ratingOption);
  }

  public onPriceChange() {
    if (this.priceRange === 'custom') {
      this.showSlider = true;
    } else {
      this.applyFilters();
    }
  }

  public readonly services: Service[] = [
    { name: 'Уборка помещений' },
    { name: 'Химчистка' },
    { name: 'Услуги сантехника' },
    { name: 'Услуги электрика' },
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

  public selectedCity?: CityFilter;

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

  public applyRange() {
    this.showSlider = false;
    this.applyFilters();
  }

  public onCityChange() {
    this.applyFilters();
  }

  public onRatingChange() {
    this.applyFilters();
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

  constructor(
    private router: Router,
    private clientProfileService: ClientProfileService,
    private route: ActivatedRoute,
  ) {}

  public openProfile() {
    if (this.currentClient) {
      this.router.navigate(['/client-profile', this.currentClient.id]);
    }
  }
}
