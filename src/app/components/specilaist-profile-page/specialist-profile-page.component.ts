import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { SpecialistProfileService } from 'src/app/services/specialist-profile.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FileUploadModule } from 'primeng/fileupload';
import { GalleriaModule } from 'primeng/galleria';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { Specialist } from 'src/app/models/specialist.model';
import { Work } from 'src/app/models/work.model';
import { Service } from 'src/app/models/service.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-specialist-profile-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AvatarModule,
    ButtonModule,
    CardModule,
    DialogModule,
    FileUploadModule,
    GalleriaModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    ToastModule
  ],
  templateUrl: './specialist-profile-page.component.html',
  styleUrl: './specialist-profile-page.component.scss',
  providers: [MessageService]
})
export class SpecialistProfilePageComponent implements OnInit{

  specialist?: Specialist;

  editMode = false;
  specialistForm: FormGroup;

  displayServiceDialog = false;
  serviceForm: FormGroup;
  uploadedFiles: any[] = [];
  works: Work[] = [{ name: '', price: 0 }];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private specialistProfileService: SpecialistProfileService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private authService: AuthService
  ) {
    this.specialistForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      patronymic: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      location: ['', Validators.required],
      about: ['']
    });

    this.serviceForm = this.fb.group({
      title: ['', Validators.required],
      location: ['', Validators.required]
    });
  }
    
  ngOnInit() {
    const userId = Number(this.route.snapshot.paramMap.get('id'));
    this.specialistProfileService.getSpecialistProfileById(userId).subscribe({
    next: (spec) => {
      this.specialist = spec;
    },
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
    if (!this.editMode && this.specialist) {
      this.specialistForm.patchValue(this.specialist);
    }
  }

  saveProfile() {
    if (this.specialistForm.valid) {
      this.specialist = { ...this.specialist, ...this.specialistForm.value };
      this.editMode = false;
      this.messageService.add({
        severity: 'success',
        summary: 'Успешно',
        detail: 'Профиль обновлен'
      });
    }
  }

  showServiceDialog() {
    this.displayServiceDialog = true;
    this.serviceForm.reset();
    this.works = [{ name: '', price: 0 }];
    this.uploadedFiles = [];
  }

  addWork() {
    this.works.push({ name: '', price: 0 });
  }

  removeWork(index: number) {
    this.works.splice(index, 1);
  }

  onUpload(event: any) {
    this.uploadedFiles = []; 
    
    for (const file of event.files) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedFiles.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  saveService() {
    if (this.serviceForm.valid && this.works.every(work => work.name && work.price > 0)) {
    const newService: Service = {
      ...this.serviceForm.value,
      works: this.works,
      photos: [...this.uploadedFiles] 
    };

    this.specialist?.services?.push(newService);
    this.displayServiceDialog = false;
    this.uploadedFiles = []; 
    this.messageService.add({
      severity: 'success',
      summary: 'Успешно',
      detail: 'Услуга добавлена'
    });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Ошибка',
        detail: 'Заполните все обязательные поля'
      });
    }
  }

  public viewReviews() {
    this.router.navigate(['/specialist-reviews', this.specialist?.id]);
  }

  public logout() {
    this.authService.logout(); // Вызов метода выхода из сервиса
    this.router.navigate(['/auth']); // Перенаправление на страницу авторизации
  }
  
}
