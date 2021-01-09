import { IBaseCategory } from '../categories';
import { IQuestion } from './IQuestion';
import { IQuestionOption } from './IQuestionOption';
import { QUESTION_TYPES } from './QuestionTypes';

/**
* Класс, описывающий вопрос.
* @author Серпаков С.А.
*/
export class Question implements IQuestion {

    id: number;
    text: string;
    options: string;
    publish: boolean;
    category: IBaseCategory;
    subcategory?: IBaseCategory;
    code?: string;
    explanation?: string;
    image?: string;
    imageKey?: number;
    service?: boolean;

    /**
     * Был дан ответ на вопрос
     */
    private _answered: boolean = false;
    /**
     * Помечан ли данный вопрос
     */
    private _marked: boolean = false;

    constructor(data: IQuestion) {
        this.id = data.id;
        this.text = data.text;
        this.options = data.options;
        this.publish = data.publish;
        this.category = data.category;
        this.subcategory = data.subcategory;
        this.code = data.code;
        this.explanation = data.explanation;
        this.image = data.image;
        this.imageKey = data.imageKey;
        this.service = data.service;
    }

    get opts(): IQuestionOption[] {
        return JSON.parse(this.options);
    }
    set opts(options: IQuestionOption[]) {
        this.options = JSON.stringify(options);
    }

    /**
     * Тип вопроса
     */
    public get type(): number {

        let rightAnswerCount = 0;

        for (const opt of this.opts) {
            if (opt.isRight) {
                rightAnswerCount++;
            }

            if (rightAnswerCount > 1) {
                return QUESTION_TYPES.MANY_RIGHT_ANSWER;
            }
        }

        return QUESTION_TYPES.ONE_RIGHT_ANSWER;
    }

    /**
     * Был ли дан правильный ответ на вопрос
     */
    public get isCorrectly(): boolean {

        // нет выбранных вариантов - счиать нечего
        if (!this.selectedOptions || !this.selectedOptions.length) {
            return false;
        }

        if (this.type === QUESTION_TYPES.ONE_RIGHT_ANSWER) {
            const [optIndex] = this.selectedOptions;
            return this.opts[(optIndex as number)].isRight;
        }

        let isCorrectly = true;
        this.opts.forEach((option, index) => {

            // Неправильный ответ получаем в двух случаях
            // 1. Вариант помечан как правильный, но юзер решил иначе
            // 2. Вариант помечен как неверный, но юзер решил иначе
            if (option.isRight && !option.selected || !option.isRight && option.selected) {
                isCorrectly = false;
            }
        });
        return isCorrectly;
    }


    /**
     * Был ли получен ответ на вопрос
     */
    public get answered(): boolean {
        return this._answered;
    }

    public set answered(value: boolean) {
        this._answered = value;
    }

    /**
     * Имеет ли только один правильный ответ
     */
    public get hasOneRightAnswer(): boolean {
        return this.type === QUESTION_TYPES.ONE_RIGHT_ANSWER;
    }

    /**
     * Индексы выбранных вариантов ответа
     */
    public get selectedOptions(): number[] {
        const selected = [];
        this.opts.forEach((opt: IQuestionOption, index: number) => {
            if (opt.selected) {
                selected.push(index);
            }
        });
        return selected;
    }

    /**
     * Помечан ли вопрос
     */
    public get marked(): boolean {
        return this._marked;
    }

    public set marked(value: boolean) {
        this._marked = value;
    }

    get subcategoryName(): string {

        if (this.subcategory) {
            return this.subcategory.name;
        }

        return '';
    }

    get fullCategoryName(): string {
        const subcategoryName = this.subcategoryName;

        if (subcategoryName) {
            return `${this.category.name}: ${subcategoryName}`

        }

        return this.category?.name || '';
    }

    /**
     * Создает копию текущего вопроса
     */
    clone(): Question {
        const data = {}
        return new Question(
            { ...this }
        );
    }
}
























