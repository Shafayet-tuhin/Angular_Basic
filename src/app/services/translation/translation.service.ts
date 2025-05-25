import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private translations = new BehaviorSubject<any>({});
  private currentLang = new BehaviorSubject<string>('en');
  
  constructor(private http: HttpClient) {
    // Initialize with default language from localStorage or use 'en'
    const savedLang = localStorage.getItem('language') || 'en';
    this.setLanguage(savedLang);
  }

  setLanguage(lang: string): void {
    localStorage.setItem('language', lang);
    this.currentLang.next(lang);
    this.loadTranslations(lang);
  }

  getCurrentLang(): Observable<string> {
    return this.currentLang.asObservable();
  }

  getTranslations(): Observable<any> {
    return this.translations.asObservable();
  }

private loadTranslations(lang: string): void {
  this.http.get(`./assets/i18n/${lang}.json`).subscribe({
    next: (data) => {
      this.translations.next(data);
    },
    error: (error) => {
      console.error(`Error loading translations for ${lang}:`, error);
      
      // Create an empty translations object to prevent further errors
      this.translations.next({});
      
      // Fallback to English if translation file can't be loaded
      if (lang !== 'en') {
        this.loadTranslations('en');
      }
    }
  });
}

  translate(key: string): string {
    const keys = key.split('.');
    let value = this.translations.value;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return value;
  }

  toggleLanguage(): void {
    const currentLang = this.currentLang.value;
    const newLang = currentLang === 'en' ? 'bn' : 'en';
    this.setLanguage(newLang);
  }
}