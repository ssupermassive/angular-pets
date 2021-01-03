import { IQuestion } from 'src/app/models/questions/IQuestion';
import { Question } from 'src/app/models/questions/Question';

/**
 * Определяет равенство дву объектов
 * @param obj1;
 * @param obj2;
 */
export function equals(obj1: object, obj2: object): boolean {

  if (obj1 === obj2) {
    return true;
  }

  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

/**
 * Добавляет параметры в URL
 * @param url;
 * @param filter;
 */
export function addParamsToUrl(url: URL, filter: object): void {
  for (const prop in filter) {
    if (filter.hasOwnProperty(prop) && filter[prop] !== undefined && filter[prop] !== null) {
      url.searchParams.set(prop, String(filter[prop]));
    }
  }
}

/**
 * Преобразует ответ БЛ к типу Question
 * @param list;
 */
export function transformToQuestions(list: IQuestion[]): Question[] {
  return list.map((question: IQuestion) => {
    return transformToQuestion(question);
  });
}

export function transformToQuestion(question: IQuestion): Question {
  return new Question(question);
}
