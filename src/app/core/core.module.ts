import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [MaterialModule, RouterModule],
    exports: [HeaderComponent]
})
export class CoreModule {}
