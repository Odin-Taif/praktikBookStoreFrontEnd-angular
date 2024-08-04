import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkTheme = 'dark-theme';

  constructor() {
    // Check and apply the saved theme from localStorage
    if (localStorage.getItem('theme') === this.darkTheme) {
      this.applyDarkTheme();
    } else {
      this.applyLightTheme();
    }
  }

  toggleTheme(): void {
    if (document.body.classList.contains(this.darkTheme)) {
      this.applyLightTheme();
    } else {
      this.applyDarkTheme();
    }
  }

  private applyDarkTheme(): void {
    document.body.classList.add(this.darkTheme);
    localStorage.setItem('theme', this.darkTheme);
  }

  private applyLightTheme(): void {
    document.body.classList.remove(this.darkTheme);
    localStorage.removeItem('theme');
  }
}
