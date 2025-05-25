import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Product } from '../../../interfaces/product.model';
import { TranslatePipe } from '../../../pipes/translate/translate.pipe';
import { TranslationService } from '../../../services/translation/translation.service';
import { TComponent } from '../../../shared/components/t/t.component';


@Component({
  selector: 'app-projects',
  imports: [CommonModule, RouterModule,TranslatePipe ,TComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css',
})


export class ProjectsComponent {

  private httpClient = inject(HttpClient);
  projects: any = [];
  isAdmin: boolean = false;
  currentLang: string = 'en';
  count = signal(0);


  private translationService = inject(TranslationService);

  ngOnInit() {
    
    this.httpClient
      .get<any[]>('http://localhost:3000/posts')
      .subscribe((data) => {
        this.projects = data;
        // console.log(this.projects);
      });
  

    

    
    const userString = localStorage.getItem('currentUser');
    const user = userString ? JSON.parse(userString) : null;
    if (user && user.role === 'admin') {
      this.isAdmin = true;
    }


    this.translationService.getCurrentLang().subscribe((lang) => {
      this.currentLang = lang;
    });
  }


  increment() {
    this.count.update((prev) => prev + 1);
  }
  decrement() {
    this.count.update((prev) => prev - 1);
  }

  constructor() { }
}
