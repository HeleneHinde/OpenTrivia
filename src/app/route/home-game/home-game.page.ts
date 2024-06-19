import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-home-game',
  templateUrl: './home-game.page.html',
  styleUrls: ['./home-game.page.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule, FormsModule, RouterLink]
})
export class HomeGamePage implements OnInit {
  pseudo: string | null = localStorage.getItem('pseudo');
  difficulties: string[] = ['easy', 'medium', 'hard'];
  selectedDifficulty: string = this.difficulties[0];
  saveInfo: boolean = false;
  isToast: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  startGame() {
    if(this.pseudo){
      if (this.pseudo.length >= 3) {

        this.isToast = false;
        // Logique supplémentaire pour sauvegarder les informations si nécessaire
        if (this.saveInfo) {
          localStorage.setItem('pseudo', this.pseudo);
          localStorage.setItem('difficulty', this.selectedDifficulty);
        }
        this.router.navigate(['/trivial', this.pseudo, this.selectedDifficulty]);
  
      } else {
        this.isToast = true;
      }
    }
  }
}
