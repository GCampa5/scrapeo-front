import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarVideosComponent } from './buscar-videos.component';

describe('BuscarVideosComponent', () => {
  let component: BuscarVideosComponent;
  let fixture: ComponentFixture<BuscarVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BuscarVideosComponent]
    });
    fixture = TestBed.createComponent(BuscarVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
