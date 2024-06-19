import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-home-game',
  templateUrl: './home-game.page.html',
  styleUrls: ['./home-game.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule, FormsModule, RouterLink]
})
export class HomeGamePage implements OnInit {
  pseudo: string ="";
  difficulties: string[] = ['easy', 'medium', 'hard'];
  selectedDifficulty: string = this.difficulties[0];
  saveInfo: boolean = false;
  isToast: boolean = false;
  score: number=0;

  constructor(private router: Router) { }

  async ngOnInit() {
    await this.loadPreferences()
  }

  async startGame() {
    if(this.pseudo){
      if (this.pseudo.length >= 3) {

        this.isToast = false;
        // Logique supplémentaire pour sauvegarder les informations si nécessaire
        if (this.saveInfo) {
          await this.savePreferences();
        }
        this.router.navigate(['/trivial', this.pseudo, this.selectedDifficulty]);
  
      } else {
        this.isToast = true;
      }
    }
  }

  async savePreferences() {
    await Preferences.set({
      key: 'userPreferences',
      value: JSON.stringify({
        pseudo: this.pseudo,
        selectedDifficulty: this.selectedDifficulty,
        score: this.score
      })
    });
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
