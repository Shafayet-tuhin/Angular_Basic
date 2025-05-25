import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../interfaces/user';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  id!: string;

  user: any = null;

  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id')!;
      console.log(this.id);

      fetch(`http://localhost:3000/dummyData/${this.id}`)
        .then((response) => response.json())
        .then((data) => {
          this.user = data;
          console.log(this.user);
        }
        )
        .catch((error) => {
          console.error('Error fetching user data:', error);
        }
      );
      
    });
  }

  goBack() {
    this.location.back();
  }
}
