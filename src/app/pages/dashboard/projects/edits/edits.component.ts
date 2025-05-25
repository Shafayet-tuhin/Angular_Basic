import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslationService } from '../../../../services/translation/translation.service';

@Component({
  selector: 'app-edits',
  imports: [CommonModule],
  templateUrl: './edits.component.html',
  styleUrl: './edits.component.css',
})
export class EditsComponent {
  projectData: any = null;
  currentLang: string = 'en';

  constructor(
    private router: Router,
    private location: Location,
    private tranlationService: TranslationService
  ) {
    const nav = this.router.getCurrentNavigation();
    console.log(nav);
    if (nav?.extras.state) {
      this.projectData = nav.extras.state;
    }

    this.tranlationService.getCurrentLang().subscribe((lang) => {
      this.currentLang = lang;
      console.log(this.currentLang);
    });
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}
