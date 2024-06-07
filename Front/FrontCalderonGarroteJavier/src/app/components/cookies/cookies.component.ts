// cookies.component.ts
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-cookies',
  templateUrl: './cookies.component.html',
  styleUrls: ['./cookies.component.css'],
  standalone: true  // Note: Requires Angular 14 or newer to use standalone components
})
export class CookiesComponent {
  @Output() consentGiven = new EventEmitter<void>();

  acceptCookies() {
    this.consentGiven.emit();  // Emit event when cookies are accepted
  }

  rejectCookies() {
    this.consentGiven.emit();  // Optionally, handle reject differently
  }
}
