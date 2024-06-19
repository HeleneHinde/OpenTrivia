import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-score',
  templateUrl: './score.page.html',
  styleUrls: ['./score.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ScorePage implements OnInit {
  score: number = 0;
  pseudo: string="";
  selectedDifficulty: string = "";


  constructor(private activatedRoute: ActivatedRoute,private router: Router) { }

  async ngOnInit() {
    this.score = this.activatedRoute.snapshot.params['score'];
    await this.loadPreferences();

  }

  restartGame(){
    this.router.navigate(['/home-game']);
  }

  async loadPreferences() {
    const { value } = await Preferences.get({ key: 'userPreferences' });
    if (value) {
      const preferences = JSON.parse(value);
      this.pseudo = preferences.pseudo;
      this.selectedDifficulty = preferences.selectedDifficulty;
      this.score = preferences.score;
    }
  }
}
