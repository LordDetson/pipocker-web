import {Component, Inject, OnInit, Renderer2} from '@angular/core';
import {DOCUMENT} from "@angular/common";
import {AppConstants} from "../../common/app-constants";

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.scss']
})
export class ThemeSwitcherComponent implements OnInit {

  isLightTheme: boolean = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer2: Renderer2
  ) {
  }

  ngOnInit(): void {
    let lastTheme = localStorage.getItem(AppConstants.lastTheme);
    if (lastTheme) {
      this.isLightTheme = (lastTheme == "true");
      this.updateTheme()
    }
  }

  onThemeSwitchChange(): void {
    this.isLightTheme = !this.isLightTheme;
    this.updateTheme();
    localStorage.setItem(AppConstants.lastTheme, this.isLightTheme.toString())
  }

  private updateTheme() {
    this.renderer2.setAttribute(this.document.body, 'data-bs-theme', this.isLightTheme ? 'light' : 'dark');
  }
}
