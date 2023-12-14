import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoVideosComponent } from './info-videos.component';

describe('InfoVideosComponent', () => {
  let component: InfoVideosComponent;
  let fixture: ComponentFixture<InfoVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoVideosComponent]
    });
    fixture = TestBed.createComponent(InfoVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
