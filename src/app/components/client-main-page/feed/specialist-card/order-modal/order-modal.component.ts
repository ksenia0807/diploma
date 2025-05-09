import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';


@Component({
  selector: 'app-order-modal',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    DropdownModule,
    DialogModule,
    ReactiveFormsModule
  ],
  templateUrl: './order-modal.component.html',
  styleUrl: './order-modal.component.scss'
})
export class OrderModalComponent implements OnInit {

  @Input() visible: boolean = false;
  public readonly services: { name: string; price: number }[] = [];
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() submit = new EventEmitter<any>();

  orderForm!: FormGroup;
  timeOptions = [
    { label: '09:00', value: '09:00' },
    { label: '10:00', value: '10:00' },
    { label: '11:00', value: '11:00' },
    { label: '12:00', value: '12:00' },
    { label: '13:00', value: '13:00' },
    { label: '14:00', value: '14:00' },
    { label: '15:00', value: '15:00' }
  ];
  minDate: Date = new Date();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.orderForm = this.fb.group({
      service: [null, Validators.required],
      date: [null, Validators.required],
      time: [null, Validators.required],
      address: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  private readonly _dialogRef = inject(DynamicDialogRef);

  public close() {
      this._dialogRef.close();
  }

  onHide() {
    this.visibleChange.emit(false);
    this.orderForm.reset();
  }

  onSubmit() {
    if (this.orderForm.valid) {
      this.submit.emit(this.orderForm.value);
      this.onHide();
    }
  }
}
