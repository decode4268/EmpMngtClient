import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Resetcomponent } from './resetcomponent';

describe('Resetcomponent', () => {
  let component: Resetcomponent;
  let fixture: ComponentFixture<Resetcomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Resetcomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Resetcomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
