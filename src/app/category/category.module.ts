import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ConfirmationModule } from 'src/app/components/confirmation';

import { TreeModule } from '../components/tree';
import { SelectorModule } from '../components/selector';
import { OpenerModule } from '../components/opener';

import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategorySelectorOpenerService } from './category-selector-opener.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@NgModule({
  declarations: [
    CategorySelectorComponent,
    CategoryListComponent,
    CategoryDialogComponent
  ],
  imports: [
    CommonModule,
    TreeModule,
    MatDialogModule,
    SelectorModule,
    OpenerModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ConfirmationModule,
  ],
  exports: [
    CategorySelectorComponent,
    CategoryListComponent,
    CategoryDialogComponent
  ],
  providers: [
    CategorySelectorOpenerService
  ],
  entryComponents: [
    CategorySelectorComponent,
    CategoryDialogComponent
  ],
})
export class CategoryModule { }
