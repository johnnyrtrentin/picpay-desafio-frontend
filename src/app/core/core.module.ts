import { NgModule } from '@angular/core';
import { MaterialModule } from '../shared/material/material.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
    declarations: [HeaderComponent],
    imports: [MaterialModule],
    exports: [HeaderComponent]
})
export class CoreModule {}
