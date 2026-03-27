import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CapacitorSession } from './capacitor-session';

describe('CapacitorSession', () => {
  let component: CapacitorSession;
  let fixture: ComponentFixture<CapacitorSession>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CapacitorSession],
    }).compileComponents();

    fixture = TestBed.createComponent(CapacitorSession);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
