import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ClientPageHeaderComponent } from "./header/client-page-header.component";
import { DividerModule } from 'primeng/divider';
import { FeedComponent } from "./feed/feed.component";

@Component({
  selector: 'app-client-main-page',
  standalone: true,
  imports: [
    CommonModule,
    ClientPageHeaderComponent,
    DividerModule,
    FeedComponent
],
  templateUrl: './client-main-page.component.html',
  styleUrl: './client-main-page.component.scss'
})
export class ClientMainPageComponent {

}
