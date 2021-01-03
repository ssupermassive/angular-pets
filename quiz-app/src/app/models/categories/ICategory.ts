import { SafeResourceUrl } from '@angular/platform-browser';
import { IBaseCategory } from './IBaseCategory';

/**
 * Интерфейс, описывающий категорию
 * @author Серпаков С.А.
 */
export interface ICategory extends IBaseCategory {
  /**
   * Описание категории
   */
  description?: string;
  /**
   * Признак опубликованности
   */
  publish?: boolean;

  /**
   * Идентификатор родительской категории
   */
  parent: number;

  /**
   * Тип записи
   */
  itemType: boolean;

  /**
   * Ссылка на изображение
   */
  image?: string | SafeResourceUrl;

  /**
   * Ключ изображения
   */
  imageKey?: number;

  /**
   * Признак, что запись является служебной
   */
  service?: boolean
}
