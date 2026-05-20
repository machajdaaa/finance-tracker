import { ComponentFixture, TestBed } from '@angular/core/testing';
import { registerLocaleData } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import localeCs from '@angular/common/locales/cs';
import { LOCALE_ID } from '@angular/core';
import { provideTranslateService } from '@ngx-translate/core';
import { DashboardComponent } from './dashboard.component';

registerLocaleData(localeCs);

describe('Dashboard', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        provideHttpClient(),
        provideTranslateService(),
        { provide: LOCALE_ID, useValue: 'cs' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
