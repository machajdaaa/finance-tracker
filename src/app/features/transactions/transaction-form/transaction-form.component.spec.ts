import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideTranslateService } from '@ngx-translate/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TransactionFormComponent } from './transaction-form.component';

describe('TransactionFormComponent', () => {
  let component: TransactionFormComponent;
  let fixture: ComponentFixture<TransactionFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionFormComponent],
      providers: [
        provideHttpClient(),
        provideTranslateService(),
        { provide: MatDialogRef, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionFormComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
