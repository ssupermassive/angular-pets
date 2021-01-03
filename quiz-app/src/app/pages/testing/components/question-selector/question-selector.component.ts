import {
  ChangeDetectionStrategy,
  Component,
  SimpleChanges,
  SimpleChange,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import { Question } from 'src/app/models/questions';

/**
 * Описание input - свойств
 */
interface IQuestionSelectorChanges {
  selected: SimpleChange;
}

/**
 * Компонент для переключения между вопросами
 */
@Component({
  selector: 'ft-question-selector',
  templateUrl: './question-selector.component.html',
  styleUrls: ['./question-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionSelectorComponent implements OnChanges {

  /**
   * Набор вопросов, по которому будет строиться компонент
   */
  @Input() questions: Question[];

  /**
   * Текущий выбранный вопрос
   */
  @Input() selected: number;

  /**
   * Текущий выбранный вопрос
   * Внутренняя переменная
   */
  private _selected: number;

  /**
   * Событие изменения выбранного вопроса
   */
  @Output() selectedChanged: EventEmitter<number>;

  constructor() {
    this.selectedChanged = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {

    const { selected } = changes;

    if (selected && selected.currentValue) {
      if (!selected.previousValue && selected.currentValue
        || (selected.previousValue && selected.currentValue !== selected.previousValue)) {
        this._selected = selected.currentValue;
      }
    }
  }

  /**
   * Обработчик клика на плитку
   * @param question;
   */
  _changeSelectedQuestion(question: Question): void {
    this._selected = question.id;
    this.selectedChanged.emit(this._selected);
  }
}
