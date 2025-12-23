import { TestBed } from '@angular/core/testing';
import {  HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,provideHttpClient(),provideHttpClientTesting()]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true when token exists', () => {
    localStorage.setItem('token', 'test-token');
    expect(service.estaAutenticado()).toBe(true);
    localStorage.removeItem('token');
  });

  it('should return false when token does not exist', () => {
    localStorage.removeItem('token');
    expect(service.estaAutenticado()).toBe(false);
  });
});
