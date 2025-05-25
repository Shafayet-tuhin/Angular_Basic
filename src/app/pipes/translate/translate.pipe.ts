import { Pipe, PipeTransform } from '@angular/core';
import { TranslationService } from '../../services/translation/translation.service';

@Pipe({
  name: 'translate',
  standalone: true,
  pure: false
})
export class TranslatePipe implements PipeTransform {
  private translations: any = {};

  constructor(private translationService: TranslationService) {
    this.translationService.getTranslations().subscribe(translations => {
      this.translations = translations;
    });
  }

  transform(key: string): string {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key; // Return the key if translation not found
      }
    }
    
    return value;
  }
}
