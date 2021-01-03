import {
  Component,
  OnInit,
  OnDestroy,
  Inject,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
  ValidationErrors
} from '@angular/forms';
import { Subscription } from 'rxjs';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ConfirmationService } from 'src/app/components/confirmation';
import { FileService } from 'src/app/services/file.service';
import { IDialogOptions } from '../interfaces';
import { Question, IQuestionOption } from 'src/app/models/questions';
import { IBaseCategory } from 'src/app/models/categories';
import { QuestionsService } from 'src/app/services/questions';
import { CategoriesService } from 'src/app/services/categories';
import { CategorySelectorComponent } from 'src/app/category';

interface ICreateFormData {
  question: Question;
  selectedCategory: IBaseCategory;
}

/**
 * Компонент диалога редактирования вопроса
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuestionDialogComponent implements OnInit, OnDestroy {

  /**
   * Заголовок диалога
   */
  dialogTitle: string;

  /**
   * Сообщение об ошибке в вопросе
   */
  feedback: string;

  /**
   * Флаг, определяющий, что редактирования завершилось
   */
  _additingComplete: boolean = false;

  /**
   * Текущий редактируемый вопрос
   */
  question: Question;

  /**
   * Можно ли добавить изображение
   */
  canEditImage: boolean;

  /**
   * Папка для изображений
   */
  imageFolder: string = 'questions';

  /**
   * Ключ прикрепленного изображения
   */
  imageKey: number;

  /**
   * Текст кнопки завершения редактирования
   */
  submitButtonCaption: string = 'Добавить';

  /**
   * Признак свернутости/развернутости поля ввода кода
   */
  codeAreaExpand: boolean = false;

  /**
   * Признак свернутости/развернутости поля ввода пояснения
   */
  explanationAreaExpand: boolean = false;

  /**
   * Предпросмотр введеного кода
   */
  showCodePreview: boolean = false;

  /**
   * Минимальное количество вариантов ответа на вопрос
   */
  readonly MIN_ANSWERS_COUNT: number = 2;

  /**
   * Максимальное количество вариантов ответа на вопрос
   */
  readonly MAX_ANSWERS_COUNT: number = 8;


  /** КОНТРОЛЫ ФОРМЫ */

  /**
   * Объект формы
   */
  _newQuestionForm: FormGroup;

  /**
   * Контрол текста вопроса
   */
  _text: FormControl;

  /**
   * Контрол кода вопроса
   */
  _code: FormControl;

  /**
   * Контрол пояснения к вопросу
   */
  _explanation: FormControl;

  /**
   * Контрол вариантов ответа
   */
  _options: FormArray;

  categoryControl: FormControl;
  subcategoryControl: FormControl;

  private _subscription: Subscription = new Subscription();

  /***/

  constructor(
    private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: IDialogOptions,
    private questionService: QuestionsService,
    private categoryService: CategoriesService,
    private confirmation: ConfirmationService,
    private fileService: FileService,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.question = this.data.question;
    this.canEditImage = this.data.canEditImage;
    this.dialogTitle = this.question && this.question.id ? 'Редактировать вопрос' : 'Добавить вопрос';

    this.feedback = this.data.feedback;
    if (this.question && this.question.id) {
      this.submitButtonCaption = 'Сохранить';
      this.codeAreaExpand = !!(this.question.code || this.question.imageKey);
      this.explanationAreaExpand = !!this.question.explanation;
      this.imageKey = this.question.imageKey;
    }

    this._createForm({
      question: this.question,
      selectedCategory: this.data.selectedCategory
    });

    // если есть код, покажем его превью
    if (this._code.value) {
      this.toggleCodePreview();
    }
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  /**
   * Создание формы
   * @param question - редактируемый вопрос
   * @param currentCategory - текущая категория вопроса
   */
  private _createForm(data: ICreateFormData): void {

    const { question, selectedCategory } = data;
    const { category, subcategory } = this._getCategoriesFromSelectedCategory(selectedCategory);

    const q = (question || {}) as Question;

    this._text = new FormControl(q.text || '', Validators.required);
    this._code = new FormControl(q.code || '');
    this._explanation = new FormControl(q.explanation || '');
    this._options = new FormArray(
      this._createOptions(q.options ? q.opts.length : this.MIN_ANSWERS_COUNT, q.opts),
      [this._rightAnswerValidator, this._requireOptionsValidator]
    );

    this.categoryControl = new FormControl(q.category || category, Validators.required);
    this.subcategoryControl = new FormControl(q.subcategory || subcategory);

    this._subscription.add(
      this.categoryControl.valueChanges.subscribe(this._categoryValueChangeHandler.bind(this))
    );

    this._newQuestionForm = new FormGroup({
      text: this._text,
      code: this._code,
      explanation: this._explanation,
      options: this._options,
      category: this.categoryControl,
      subcategory: this.subcategoryControl
    });
  }

  /**
   * Обработчик клика на кнопку изменения опубликованности вопроса
   * @param publish - признак опубликованности
   */
  publishChange(publish: boolean): void {
    this._subscription.add(
      this.questionService.changePublish(this.question.id, publish).subscribe(() => {
        this.question.publish = publish;
        this.changeDetector.markForCheck();
      })
    );
  }

  /**
   * Обработчик клика на кнопку удаления
   */
  deleteQuestion(): void {
    this._subscription.add(
      this.questionService.delete(this.question.id).subscribe(() => {
        this._close('delete');
      })
    );
  }

  /**
   * Закрывает диалог
   * @param action;
   * @param question;
   */
  _close(action?: string): void {
    this.dialogRef.close({
      action,
      question: this.question
    });
  }

  /**
   * Обработчик клика на кнопку "Добавить ещё"
   */
  _addMoreHandler(): void {
    this.question = null;
    this._createForm({
      question: null,
      selectedCategory: this.data.selectedCategory
    });
    this._additingComplete = false;
    this.changeDetector.markForCheck();
  }

  /**
   * Добавить новый вопрос, взяв за основу предыдущий созданный
   */
  protected _addBasedLast(): void {
    const question = new Question(this.question);

    const opts = question.opts.map((opt: IQuestionOption) => {
      return {
        text: opt.text,
        isRight: false
      };
    });

    question.opts = opts;
    this.question = question;

    let selectedCategory;

    if (question.subcategory) {
      selectedCategory = { ...question.subcategory } as IBaseCategory;
      selectedCategory.parentModel = question.category as IBaseCategory;
    } else {
      selectedCategory = question.category as IBaseCategory;
    }

    this._createForm({
      question,
      selectedCategory
    });
    this._additingComplete = false;
    this.changeDetector.markForCheck();
  }

  /**
   * Обработчик изменения изображения
   * @param key;
   */
  protected _imageChangedHandler(key: number): void {
    if (this.question && this.question.id && !key) {
      this._subscription.add(
        this.questionService.resetImage(this.question.id).subscribe()
      )
    }

    this.imageKey = key;
    this.changeDetector.markForCheck();
  }

  /** МЕТОДЫ, ПЕРЕКОЧЕВАВШИЕ ИЗ КОМПОНЕНТА ФОРМЫ */


  /**
   * Обработчик клика на кнопку завершения редактирования
   * @param form
   */
  _submitHandler(form: FormGroup): void {
    if (form.valid) {
      const optionsArray = [];

      this._options.controls.forEach((formGroup: FormGroup) => {
        optionsArray.push({
          text: formGroup.get('text').value.trim(),
          isRight: formGroup.get('isRight').value
        });
      });

      const id = this.question && this.question.id;
      const text = this._text.value.trim();
      const code = this._code.value.trim();
      const explanation = this._explanation.value.trim();
      const options = JSON.stringify(optionsArray);
      const category = this.categoryControl.value;
      const subcategory = this.subcategoryControl.value;

      const question = {
        id,
        publish: !!(this.question && this.question.publish),
        imageKey: this.imageKey,
        text,
        options,
        code,
        explanation,
        category,
        subcategory
      } as Question;

      if (!id) {
        this._subscription.add(
          this.questionService.create(question).subscribe(() => {
            this.question = question;
            this._additingComplete = true;
            this.changeDetector.markForCheck();
          })
        );
      } else {
        this._subscription.add(
          this.questionService.update(question).subscribe(() => {
            this._close('update');
          })
        );
      }
      return;
    }

    this._subscription.add(
      this.confirmation.open({
        type: 'alert',
        message: 'Необходимо заполнить обязательные поля'
      }).subscribe()
    );
  }

  /**
   * Обработчик клика на кнопку закрыть
   */
  _closeButtonClickHandler(): void {
    if (this._newQuestionForm.dirty) {
      this._subscription.add(
        this.confirmation.open({
          type: 'confirm',
          message: 'Сохранить изменения?'
        }).subscribe((result: boolean) => {
          if (result) {
            this._submitHandler(this._newQuestionForm);
            return;
          }
          this._close();
        })
      );
      return;
    }
    this._close();
  }

  /**
   * Вычисляет категорию и подкатегорию из переданной категории
   */
  private _getCategoriesFromSelectedCategory(selectedCategory: IBaseCategory): {
    category: IBaseCategory,
    subcategory: IBaseCategory
  } {
    if (selectedCategory) {
      if (selectedCategory.parentModel) {
        return {
          category: selectedCategory.parentModel,
          subcategory: selectedCategory
        };
      }

      return {
        category: selectedCategory,
        subcategory: null
      };
    }

    return {
      category: null,
      subcategory: null
    };
  }

  /**
   * Создает набор контролов для вариантов ответа
   * @param count;
   * @param options;
   */
  _createOptions(count?: number, options: IQuestionOption[] = []): any {

    const createFormGroup = (option?: IQuestionOption) => new FormGroup({
      text: new FormControl(option && option.text || '', Validators.required),
      isRight: new FormControl(option && option.isRight || false)
    });

    if (count && count > 0) {
      const formArray = [];
      for (let i = 0; i < count; i++) {
        formArray.push(createFormGroup(options[i]));
      }
      return formArray;
    }

    return createFormGroup();
  }

  /**
   * Удаление варианта ответа
   * @param index;
   */
  _deleteOption(index: number): void {
    this._options.removeAt(index);
  }

  /**
   * Добавление ещё одного варианта ответа на вопрос
   */
  _addOption(): void {
    this._options.push(this._createOptions());
  }

  /**
   * Обработчик выбора изображения
   */
  fileChoosedHandler(data: { file: File }): void {
    this._subscription.add(
      this.fileService.upload(data.file, this.imageFolder).subscribe((key: number) => {
        this._imageChangedHandler(key);
      })
    );
  }

  toggleCodePreview(): void {
    this.showCodePreview = !this.showCodePreview;
  }

  /**
   * Валидация вариантов ответов на вопрос - среди них должен быть хотя бы один правильный
   * @param controlArray;
   */
  private _rightAnswerValidator(controlArray: FormArray): ValidationErrors {

    for (const formGroup of controlArray.controls) {
      if (formGroup.get('isRight').value) {
        return null;
      }
    }

    return { noOneRightAnswer: 'Хотя бы один ответ должен быть верным' };
  }

  /**
   * Валидация заполненности всех вариантов ответа
   * @param controlArray;
   */
  private _requireOptionsValidator(controlArray: FormArray): ValidationErrors {

    for (const formGroup of controlArray.controls) {
      if (formGroup.get('text').errors && formGroup.get('text').errors.required) {
        return { notAllOptionsFilled: 'Необходимо заполнить все варианты ответа' };
      }
    }

    return null;
  }

  /**
   * Разворот блока
   * @param property;
   */
  _toggleArea(property: string): void {
    this[property] = !this[property];
  }

  /**
   * Обработчик события окончания перетаскивания опции
   * @param event;
   */
  _optionsDropEndHandler(event: CdkDragDrop<FormGroup[]>): void {
    moveItemInArray(this._options.controls, event.previousIndex, event.currentIndex);
  }

  getCategorySelectorConfig(filter: object): object {
    return {
      template: CategorySelectorComponent,
      preloadConfig: [
        {
          service: this.categoryService,
          methodName: 'getList',
          methodParams: [filter],
          resultFieldName: 'dataSource'
        }
      ],
      minWidth: '300px'
    };
  }

  /**
   * Обработчик изменения выбранной категории
   * @param newValue
   */
  private _categoryValueChangeHandler(newValue: IBaseCategory): void {
    this.subcategoryControl.reset();
  }
}
