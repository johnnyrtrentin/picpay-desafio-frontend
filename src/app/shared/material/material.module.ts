import { NgModule } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  imports: [
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatBadgeModule,
    MatRippleModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    MatBadgeModule,
    MatRippleModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatDividerModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}
