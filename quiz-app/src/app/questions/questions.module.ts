import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TextFieldModule } from '@angular/cdk/text-field';
import { QuestionDialogComponent } from './question-dialog/question-dialog.component';
import { QuestionDialogOpenerService } from './question-dialog-opener.service';
import { ConfirmationModule } from 'src/app/components/confirmation';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HighlightModule } from 'ngx-highlightjs';
import { OpenerModule } from 'src/app/components/opener';
import { SelectorModule } from 'src/app/components/selector';
import { CategoryModule } from 'src/app/category';

/**
 * Модуль, содержащий диалог редактирования вопроса
 * @author Серпаков С.А.
 */
@NgModule({
  declarations: [QuestionDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    TextFieldModule,
    ReactiveFormsModule,
    DragDropModule,
    ConfirmationModule,
    HighlightModule,
    OpenerModule,
    SelectorModule,
    CategoryModule
  ],
  providers: [QuestionDialogOpenerService],
  entryComponents: [QuestionDialogComponent]
})
export class QuestionsModule { }
