import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { AxiesService } from './axies.service';

describe('Service: Axies', () => {
  let httpTestingController: HttpTestingController;
  let service: AxiesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AxiesService],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AxiesService);
  });

  it('should call get axie with the correct URL', () => {
    service.getAxie('1').subscribe();
    const req = httpTestingController.expectOne('https://graphql-gateway.axieinfinity.com/graphql');
    req.flush({});
    expect(req.request.method).toBe('POST');
  });
});
