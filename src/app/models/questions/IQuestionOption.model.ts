/**
 * Интерфейс, описывающий варианты ответа на вопрос
 * @author Серпаков С.А.
 */
export interface IQuestionOption {

    /**
     * Текст варианта ответа
     */
    text: string;

    /**
     * Является ли вариант ответа верным
     */
    isRight: boolean;

    /**
     * Выбран ли этот вариант ответа
     */
    selected?: boolean;
}