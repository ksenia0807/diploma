import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';

@Component({
  selector: 'app-specialist-detail',
  standalone: true,
  imports: [CommonModule, GalleriaModule],
  templateUrl: './specialist-detail.component.html',
  styleUrl: './specialist-detail.component.scss'
})
export class SpecialistDetailComponent {

  @Input() specialist: any;
}
