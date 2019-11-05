import { TestBed } from '@angular/core/testing';

import { TasksDbService } from './tasks-db.service';

describe('TasksDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TasksDbService = TestBed.get(TasksDbService);
    expect(service).toBeTruthy();
  });
});
