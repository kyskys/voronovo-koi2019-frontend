import { TestBed } from '@angular/core/testing';

import { CategoryNameService } from './category-name.service';

describe('CategoryNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CategoryNameService = TestBed.get(CategoryNameService);
    expect(service).toBeTruthy();
  });
});
