import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Appwrite } from './appwrite';

describe('Appwrite', () => {
  let component: Appwrite;
  let fixture: ComponentFixture<Appwrite>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Appwrite],
    }).compileComponents();

    fixture = TestBed.createComponent(Appwrite);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
