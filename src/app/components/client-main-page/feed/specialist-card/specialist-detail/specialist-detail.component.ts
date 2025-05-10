import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ActivatedRoute } from '@angular/router';
import { Specialist, SpecialistService } from 'src/app/services/specialist.service';
import { ButtonModule } from 'primeng/button';
import { OrderModalService } from 'src/app/services/order-modal.service';


@Component({
  selector: 'app-specialist-detail',
  standalone: true,
  imports: [CommonModule, GalleriaModule, ButtonModule],
  templateUrl: './specialist-detail.component.html',
  styleUrl: './specialist-detail.component.scss',
  providers: [OrderModalService]
})
export class SpecialistDetailComponent implements OnInit{

  specialist?: Specialist;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private specialistService: SpecialistService,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.specialistService.getSpecialistById(id).subscribe({
      next: (spec) => {
        this.specialist = spec;
        this.loading = false;
        if (!spec) {
          this.error = 'Специалист не найден';
        }
      },
      error: () => {
        this.error = 'Ошибка загрузки данных';
        this.loading = false;
      }
    });

  }

  private readonly _orderDialogService = inject(OrderModalService);

  public showDialog() {
    this._orderDialogService.open(this.specialist?.services ?? []);
  }

}
