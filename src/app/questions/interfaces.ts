import { TemplateRef } from '@angular/core';
import { IBaseCategory } from 'src/app/models/categories/IBaseCategory.model';
import { Question } from 'src/app/models/questions/Question.model';

/**
 * Базовый набор опций для диалога редактирования вопроса
 */
export interface IDialogOptions {

    /**
     * Категория, которая будет выбранна при открытии диалога
     */
    selectedCategory?: IBaseCategory;

    /**
    * Текст сообщения об ошибке в вопросе
    */
    feedback?: string;

    /**
    * Шаблон, который будет отображаться в случае удачного добавления вопроса
    */
    addCompleteTemplate?: TemplateRef<any>;

    /**
     * Идентификатор вопроса
     */
    key?: number;

    question?: Question;
}

export interface IQuestionEditResult {
    action: string;
    question: Question;
}
