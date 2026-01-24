import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StorybookHost } from './storybook-host';

describe('StorybookHost', () => {
  let component: StorybookHost;
  let fixture: ComponentFixture<StorybookHost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StorybookHost],
    }).compileComponents();

    fixture = TestBed.createComponent(StorybookHost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
