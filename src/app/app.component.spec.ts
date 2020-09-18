import { TestBed, async, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppService } from './app.service';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppComponent],
        }).compileComponents();
    }));

    it('user listing service', inject([AppService], (service: AppService) => {
        expect(service.getUsers()).toBeTruthy();
    }));
});
