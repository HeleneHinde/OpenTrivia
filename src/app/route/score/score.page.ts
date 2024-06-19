import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ScorePage implements OnInit {
  score: number = 0;

  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  ngOnInit() {
    this.score = this.activatedRoute.snapshot.params['score'];
  }

  restartGame(){
    this.router.navigate(['/home-game']);
  }

}
