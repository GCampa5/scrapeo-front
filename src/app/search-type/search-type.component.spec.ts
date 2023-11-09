import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTypeComponent } from './search-type.component';

describe('SearchTypeComponent', () => {
  let component: SearchTypeComponent;
  let fixture: ComponentFixture<SearchTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTypeComponent]
    });
    fixture = TestBed.createComponent(SearchTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
