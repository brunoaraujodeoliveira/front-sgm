import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeSecurityComponent } from './life-security.component';

describe('LifeSecurityComponent', () => {
  let component: LifeSecurityComponent;
  let fixture: ComponentFixture<LifeSecurityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeSecurityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
