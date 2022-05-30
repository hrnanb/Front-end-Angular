import { TestBed } from '@angular/core/testing';

import { EducacionInterceptorService } from './educacion-interceptor.service';

describe('EducacionInterceptorService', () => {
  let service: EducacionInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducacionInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
