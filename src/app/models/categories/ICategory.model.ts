import { SafeResourceUrl } from '@angular/platform-browser';
import { IService } from '../IService.model';
import { IBaseCategory } from './IBaseCategory.model';

/**
 * Интерфейс, описывающий категорию
 * @author Серпаков С.А.
 */
export interface ICategory extends IBaseCategory, IService {
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
}
