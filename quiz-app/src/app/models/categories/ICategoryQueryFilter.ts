/**
 * Интерфейс, описывающий фильтр для списка категорий
 * @author Серпаков С.А.
 */
export interface ICategoryQueryFilter {

    /**
     * Нужно ли вернуть в списке служебные записи
     */
    enableServiceCategory?: boolean;

    /**
     * Фильтр по опубликованным
     */
    publish?: boolean;

    /**
     * Фильтрация по родительской категории
     */
    parent?: number;

    /**
     * Будет возвращен плоский список
     */
    flatList?: boolean;

    /**
     * Фильтрация по типу записи
     */
    itemType?: boolean;
}
