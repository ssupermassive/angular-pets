import { IQuestionOption } from './IQuestionOption';

/**
 * Интерфейс, описывающий вопрос
 * @author Серпаков С.А.
 */
export interface IQuestion {
  /**
   * Идентификатор вопроса
   */
  id: number;
  /**
   * Текст вопроса
   */
  text: string;
  /**
   * Варианты ответа на вопрос в формате JSON
   */
  options: string;
  /**
   * Признак опубликованности
   */
  publish: boolean;
  /**
   * Пример кода для вопроса
   */
  code?: string;
  /**
   * Пояснение к вопросу
   */
  explanation?: string;
  /**
   * ссылка на прикрепленную картинку
   */
  image?: string;
  /**
   * ключ прикрепленной картинки
   */
  imageKey?: number;
  /**
   * Категория вопроса
   */
  category: {id: number; name: string};
  /**
   * Подкатегория вопроса
   */
  subcategory?: {id: number; name: string};
}