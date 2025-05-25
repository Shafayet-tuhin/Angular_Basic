import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslationService } from '../../../services/translation/translation.service';
import { TranslatePipe } from '../../../pipes/translate/translate.pipe';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule,RouterModule,TranslatePipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css',
})
export class ReportsComponent implements OnInit {
  users: any[] = [];
  currentLang: string = 'en';

  private httpClient = inject(HttpClient);

  private translationService = inject(TranslationService);

  ngOnInit() {
    this.httpClient.get<any[]>('http://localhost:3000/dummyData').subscribe((data) => {
      this.users = data;
    });

    this.translationService.getCurrentLang().subscribe((lang) => {
      this.currentLang = lang;
    });
  }
}