import {Component, Inject, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent {

  isLightTheme: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2
  ) {
  }

  onThemeSwitchChange(): void {
    this.isLightTheme = !this.isLightTheme;
    this.renderer2.setAttribute(this.document.body, 'data-bs-theme', this.isLightTheme ? 'light' : 'dark');
  }
}
