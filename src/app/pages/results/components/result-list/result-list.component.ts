import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Question } from 'src/app/models/questions';
import {MatTabChangeEvent} from '@angular/material/tabs';

enum TABS_INDEX {
  ALL,
  RIGHTS,
  WRONGS
}

/**
 * Компонент выводящий результаты тестирования
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-result-list',
  templateUrl: './result-list.component.html',
  styleUrls: ['./result-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResultListComponent implements OnInit {

  /**
   * Набор вопросов, которые будут отражены
   */
  @Input() questions: Question[];

  /**
   * Набор вопросов, которые будут отражены.
   * Внутреннее свойство
   */
  _questions: Question[];
  _tabs: string[] = ['Все', 'Правильные', 'Неверные'];

  ngOnInit(): void {
    this._questions = this.questions;
  }

  /**
   * Обработчик изменения выбранной вкладки
   * @param id
   */
  _changeSelectedTadHandler(event: MatTabChangeEvent): void {
    switch (event.index) {
      case TABS_INDEX.ALL:
        this._questions = this.questions;
        break;
      case TABS_INDEX.RIGHTS:
        this._questions = this.questions.filter((item) => {
          return item.isCorrectly;
        });
        break;
      case TABS_INDEX.WRONGS:
        this._questions = this.questions.filter((item) => {
          return !item.isCorrectly;
        });
        break;
    }
  }
}
