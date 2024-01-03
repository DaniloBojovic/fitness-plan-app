import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure that there are no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should authenticate a user', () => {
    const dummyResponse = {
      role: 'admin',
    };

    service.login('admin', 'password').subscribe((response) => {
      expect(response.role).toEqual('admin');
    });

    const req = httpMock.expectOne(`http://localhost:3000/auth/login`);
    expect(req.request.method).toBe('POST');
    req.flush(dummyResponse);
  });

  it('should handle error', () => {
    const errorEvent = new ErrorEvent('Network error', {
      message: 'Failed to load resource',
    });

    service.login('admin', 'password').subscribe(
      () => fail('should have failed with a network error'),
      (error: HttpErrorResponse) => {
        expect(error.error.message).toEqual('Failed to load resource');
      }
    );

    const req = httpMock.expectOne(`http://localhost:3000/auth/login`);
    expect(req.request.method).toBe('POST');
    req.error(errorEvent); // trigger the error
  });
});
