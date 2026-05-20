import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { TransactionFilterComponent } from './transaction-filter.component';

describe('TransactionFilterComponent', () => {
  let component: TransactionFilterComponent;
  let fixture: ComponentFixture<TransactionFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFilterComponent],
      providers: [
        provideHttpClient(),
        provideTranslateService(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFilterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
