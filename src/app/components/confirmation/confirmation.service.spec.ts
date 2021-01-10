import { TestBed } from '@angular/core/testing';

import { ConfirmationService } from './confirmation.service';

describe('ConfirmationDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConfirmationService = TestBed.get(ConfirmationService);
    expect(service).toBeTruthy();
  });
});
