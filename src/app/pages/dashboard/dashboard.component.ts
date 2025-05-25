import { CommonModule } from '@angular/common';
import { User } from './../../interfaces/user';
import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { TranslationService } from '../../services/translation/translation.service';
import { TranslatePipe } from '../../pipes/translate/translate.pipe';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, TranslatePipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
   
  private auth = inject(AuthService);
  private translationService = inject(TranslationService);

  user: User | null = null;
  isAdmin: boolean = false;
  currentLang: string = 'en';

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.isAdmin = this.user?.role === 'admin';
    
    this.translationService.getCurrentLang().subscribe(lang => {
      this.currentLang = lang;
    });
  }

  logOut(): void {
    this.auth.logOut();
  }

  toggleLanguage(): void {
    this.translationService.toggleLanguage();
  }
}
