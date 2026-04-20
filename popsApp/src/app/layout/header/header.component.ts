import { Component, inject, computed } from '@angular/core';
import { RouterLink, Router, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authservice = inject(AuthService);
  private router = inject(Router);

  isLoggedIn = this.authservice.isLoggedIn;

  email = computed(() => this.authservice.currentUser()?.email ?? '');

  onLogout(): void {
    this.authservice.logout().subscribe({
      next: () => {
        this.authservice.clearSession();
        this.router.navigate(['/home']);
      },
      error: () => {
        this.authservice.clearSession();
        this.router.navigate(['/dashboard']);
      }
    });
   
  }

}
