import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { transformToQuestions } from 'src/app/core/utils';
import { IQuestion, Question } from 'src/app/models/questions';
import { ICategory } from 'src/app/models/categories';
import { Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/services/file.service';

const TEST_API_URL = `${location.origin}/api/v1/test/`;
const DEFAULT_QUIZ_IMG = '../../../images/tile_img_default.png';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    private fileService: FileService) { }

  getList(): Observable<ICategory[]> {
    return this.http.get(TEST_API_URL).pipe(map(
      (result: ICategory[]) => {
        return result.map((item: ICategory) => {
          const updatedItem = { ...item };
          updatedItem.image = this.domSanitizer.bypassSecurityTrustResourceUrl(
            this.fileService.getFileLink(updatedItem.imageKey) || DEFAULT_QUIZ_IMG
          )
          return updatedItem;
        })
      }));
  }

  getQuestionsList(id: number): Observable<Question[]> {
    return this.http.get(`${TEST_API_URL}${id}`).pipe(
      map((result: IQuestion[]) => {
        return transformToQuestions(result);
      })
    );
  }
}
