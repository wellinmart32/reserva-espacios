import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, LoginRequest, RegisterRequest, AuthResponse } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api';
  private usuarioSubject = new BehaviorSubject<User | null>(null);
  public usuarioActual$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    this.cargarUsuarioDesdeToken();
  }

  registrar(datos: RegisterRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrar`, datos);
  }

  login(credenciales: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credenciales).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
        this.usuarioSubject.next(response.usuario);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      tap(() => {
        localStorage.removeItem('token');
        this.usuarioSubject.next(null);
      })
    );
  }

  obtenerUsuarioActual(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/yo`).pipe(
      tap(usuario => this.usuarioSubject.next(usuario))
    );
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('token');
  }

  obtenerToken(): string | null {
    return localStorage.getItem('token');
  }

  private cargarUsuarioDesdeToken(): void {
    if (this.estaAutenticado()) {
      this.obtenerUsuarioActual().subscribe({
        error: () => {
          localStorage.removeItem('token');
          this.usuarioSubject.next(null);
        }
      });
    }
  }
}