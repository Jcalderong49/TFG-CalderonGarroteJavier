// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  showCookieConsent = !sessionStorage.getItem('cookieConsent');  // Shows the modal if no consent
  showApp = !!sessionStorage.getItem('cookieConsent');  // Shows the app if consent is given

  onConsentGiven() {
    sessionStorage.setItem('cookieConsent', 'true');
    this.showCookieConsent = false;
    this.showApp = true;
  }
}
