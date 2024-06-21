import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() categorySelected = new EventEmitter<string>();

  navbarOpen = false;
  dropdownOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  toggleDropdown(event: Event) {
    event.preventDefault();
    this.dropdownOpen = !this.dropdownOpen;
  }

  filterProducts(category: string) {
    this.categorySelected.emit(category);
  }
}
