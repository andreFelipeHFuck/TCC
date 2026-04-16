import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleMenu } from './toggle-menu';

describe('ToggleMenu', () => {
  let component: ToggleMenu;
  let fixture: ComponentFixture<ToggleMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleMenu],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
