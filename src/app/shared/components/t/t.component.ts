import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslationService } from '../../../services/translation/translation.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 't',
  standalone: true,
  template: `{{ value }}`
})
export class TComponent implements OnInit, OnDestroy {
  @Input() key!: string;
  value: string = '';
  private sub = new Subscription();

  constructor(private translationService: TranslationService) {}

  ngOnInit(): void {
    this.sub.add(
      this.translationService.getTranslations().subscribe(translations => {
        this.value = this.getTranslation(this.key, translations);
      })
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  private getTranslation(key: string, translations: any): string {
    const keys = key.split('.');
    let value = translations;
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value;
  }
}
