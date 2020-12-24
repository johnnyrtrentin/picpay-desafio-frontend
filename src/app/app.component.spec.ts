import { TestBed, async, inject } from '@angular/core/testing';
import { UserService } from 'src/app/users/user/user.service';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));
});
