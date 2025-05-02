import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpecialistCardComponent } from "./specialist-card/specialist-card.component";
import { ScrollPanelModule } from 'primeng/scrollpanel';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [CommonModule, SpecialistCardComponent, ScrollPanelModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {}
