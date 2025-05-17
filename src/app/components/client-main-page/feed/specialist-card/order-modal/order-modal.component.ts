import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';


@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule
  ],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss'
})
export class OrderModalComponent implements OnInit {

  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<any>();

  private readonly _dialogRef = inject(DynamicDialogRef);
  private readonly _config = inject(DynamicDialogConfig);

  public services: { name: string; price: number }[] = [];

  public orderForm!: FormGroup;
  public readonly timeOptions = [
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' },
    { label: '16:00', value: '16:00' },
    { label: '17:00', value: '17:00' },
    { label: '18:00', value: '18:00' },
  ];
  public minDate: Date = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.services = this._config.data?.services ?? [];
    this.orderForm = this.fb.group({
      service: [null, Validators.required],
      description: ['', Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  public close() {
      this._dialogRef.close();
  }

  onHide() {
    this.visibleChange.emit(false);
    this.orderForm.reset();
    this._dialogRef.close();
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.submit.emit(this.orderForm.value);
      this.onHide();
    }
  }

  public onOrderSubmit(orderData: any) {
    console.log('Получена заявка:', orderData);
    // Здесь можно отправить данные на сервер
  }
}
