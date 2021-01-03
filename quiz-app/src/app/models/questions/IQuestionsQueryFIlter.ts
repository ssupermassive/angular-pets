/**
 * Интерфейс, описывающий фильтр для списка категорий
 * @author Серпаков С.А.
 */
export interface IQuestionsQueryFilter {
    /**
     * Категория
     */
    category?: number;

    /**
     * Признак опубликованности
     */
    publish?: boolean;
    /**
     * Нужно ли перемешивать вопросы
     */
    random?: boolean;
    /**
     * Фильтр по строке
     */
    text?: string;
}