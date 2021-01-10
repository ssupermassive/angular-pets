import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormArray,
  Validators,
  ValidationErrors,
  AbstractControl
} from '@angular/forms';

import { Question, QUESTION_TYPES, IQuestionOption } from 'src/app/models/questions';

/**
 * Компонент формы тестирования
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-testing-form',
  templateUrl: './testing-form.component.html',
  styleUrls: ['./testing-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestingFormComponent implements OnChanges {

  /**
   * Вопрос, отображаемый на форме
   */
  @Input() question: Question;

  /**
   * Режим отображения результатов
   */
  @Input() showResult: boolean = false;

  /**
   * Событие сообщающее, что был дан ответ на вопрос
   */
  @Output() answerReceived: EventEmitter<any>;

  /**
   * Контролы формы
   */
  _form: FormGroup = null;
  _checkboxes: FormArray;
  _radio: FormControl;

  constructor() {
    this.answerReceived = new EventEmitter();
  }

  ngOnChanges({ question }: SimpleChanges): void {
    if (question && question.currentValue !== question.previousValue) {
      this._createForm();
    }
  }

  /**
   * Создание формы исходя из типа вопроса
   */
  private _createForm(): void {

    switch (this.question.type) {
      case QUESTION_TYPES.ONE_RIGHT_ANSWER:

        // Когда у нас только один правильный ответ будем использовать radio
        // В этом случае не нужен FormArray, т.к. с ним невозможно будет определить, какой конкретно
        // из инпутов активен (либо Я пока не предумал как это сделать), по этому все кнопки будут
        // смотреть на один FormControl
        const [index] = this.question.selectedOptions;
        const selectedOption = index || index === 0 ? index : null;
        this._radio = new FormControl(selectedOption, Validators.required);
        this._form = new FormGroup({ radio: this._radio });
        break;
      case QUESTION_TYPES.MANY_RIGHT_ANSWER:

        this._checkboxes = new FormArray(this.question.opts.map((opt, i) =>
          new FormControl(!!this.question.opts[i].selected)), this._checkboxesArrayValidator
        );

        // Если на вопрос больше одного правильного ответа используем checkbox c FormArray
        this._form = new FormGroup({
          checkboxes: this._checkboxes
        });
        break;
    }
  }

  /**
   * Обработка полученного ответа на вопрос
   * @param form
   */
  _onSubmit(): void {
    if (this._form.valid) {
      this.question.answered = true;
      this.question.marked = false;
      this.answerReceived.emit(this.question.isCorrectly);
    }
  }

  /**
   * Пометить вопрос
   */
  _setMarked(): void {
    this.question.marked = !this.question.marked;
  }

  /**
   * Валидация группы чек - боксов.
   * Должно быть выбранно хотя бы одно значение
   */
  private _checkboxesArrayValidator(controlArray: FormArray): ValidationErrors {
    if (Boolean(~controlArray.value.indexOf(true))) {
      return null;
    }

    return { invalidCheckboxesArray: 'Должно быть выбранно хотя бы одно значение' };
  }

  _setSelected(control: AbstractControl, index: number): void {
    if (!this.question.answered) {

      // в radio выбранное значение передается как число, в checkbox как булевое значение
      if (control instanceof FormControl) {
        this._radio.setValue(index);
        this.question.opts = this.question.opts.map((opt: IQuestionOption, i: number) => {
          opt.selected = i === index;
          return opt;
        });
        return;
      }
      this._checkboxes.controls[index].setValue(!this._checkboxes.controls[index].value);
      const opts = [].concat(this.question.opts);
      opts[index].selected = !opts[index].selected;
      this.question.opts = opts;
    }
  }
}
