import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-barra-navegacion',
  standalone: true,
  imports: [CommonModule, MenubarModule, ButtonModule],
  templateUrl: './barra-navegacion.component.html',
  styleUrl: './barra-navegacion.component.css'
})
export class BarraNavegacionComponent implements OnInit {
  items: MenuItem[] = [];

  constructor(
    public authService: AuthService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.authService.usuarioActual$.subscribe(usuario => {
      if (usuario) {
        this.items = [
          {
            label: 'Espacios',
            icon: 'pi pi-building',
            command: () => this.router.navigate(['/espacios'])
          },
          {
            label: 'Mis Reservas',
            icon: 'pi pi-calendar',
            command: () => this.router.navigate(['/mis-reservas'])
          },
          {
            label: 'Gestión de Espacios',
            icon: 'pi pi-cog',
            command: () => this.router.navigate(['/admin/espacios'])
          }
        ];
      } else {
        this.items = [
          {
            label: 'Espacios',
            icon: 'pi pi-building',
            command: () => this.router.navigate(['/espacios'])
          }
        ];
      }
    });
  }

  irIniciarSesion(): void {
    this.router.navigate(['/iniciar-sesion']);
  }

  irRegistro(): void {
    this.router.navigate(['/registro']);
  }

  cerrarSesion(): void {
    this.authService.logout();
    this.router.navigate(['/espacios']);
  }

  obtenerNombreUsuario(): string {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Intentar diferentes nombres de campo del payload
        return payload.sub?.name || payload.name || payload.usuario || payload.email || 'Usuario';
      } catch (e) {
        console.error('Error al decodificar token:', e);
        return 'Usuario';
      }
    }
    return 'Usuario';
  }
}