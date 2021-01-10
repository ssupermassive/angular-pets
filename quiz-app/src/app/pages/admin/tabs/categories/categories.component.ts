import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Data } from '@angular/router';
import { Subscription } from 'rxjs';

import { ICategory } from 'src/app/models/categories';
import { Question, IQuestionsQueryFilter } from 'src/app/models/questions';
import { CategorySelectorOpenerService } from 'src/app/category';

import { CategoriesListComponent } from '../../components/categories-list/categories-list.component';
import { QuestionsListComponent } from '../../components/questions-list/questions-list.component';


@Component({
  selector: 'ft-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoriesComponent implements OnInit, OnDestroy {

  @ViewChild(CategoriesListComponent) categoriesList: CategoriesListComponent;
  @ViewChild(QuestionsListComponent) questionsList: QuestionsListComponent;

  /**
   * Текущая выбранная категория в мастер - списке
   */
  selectedCategory: ICategory = null;

  /**
   * Текущий фильтр списка вопросов
   */
  _filter: IQuestionsQueryFilter = {};

  /**
   * Набор вопросов
   */
  _questions: Question[];

  /**
   * Набор категорий
   */
  _categories: ICategory[];

  /**
   * Признак наличия выбранных записей в списке
   */
  _hasSelection: boolean = false;

  _subscription: Subscription = new Subscription()

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private categorySelectorOpener: CategorySelectorOpenerService
  ) { }

  ngOnInit(): void {
    this._subscription.add(
      this.route.data.subscribe((data: Data) => {
        this._questions = data.adminData['questions'];
        this._categories = data.adminData['categories'];
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Обработчик события изменения фильтра
   * @param filter;
   */
  _filterChanged(filter: IQuestionsQueryFilter): void {
    const newFilter = { ...filter };
    newFilter.category = this._filter.category;
    this._filter = newFilter;
  }

  /**
   * Создание вопроса
   */
  _createQuestion(): void {
    this.questionsList.addQuestion();
  }

  /**
   * Создание категории
   */
  _createCategory(): void {
    this.categoriesList.addCategory();
  }

  /**
   * Обработчик клика по строке в списке категорий
   * @param category;
   */
  _onCategoryClick(category: ICategory): void {
    this.selectedCategory = category;
    const filter = { ...this._filter };
    filter.category = category.id;
    this._filter = filter;
  }

  /**
   * Обработчик изменения выбранных записей в списке вопросов
   * @param selection;
   */
  _questionSelectionChanged(selection: object[]): void {
    this._hasSelection = !!selection.length;
  }

  /**
   * Изменить опубликованность выбранных вопросов
   * @param publish;
   */
  _publishToggle(publish: boolean): void {
    this.questionsList.tooglePublishMass(publish);
  }

  /**
   * Обработчик события изменения категории
   */
  _categoryChangedHandler(): void {
    this.questionsList.reload();
  }
}
