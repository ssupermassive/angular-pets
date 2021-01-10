
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionsService } from 'src/app/services/questions';
import { CategoriesService } from 'src/app/services/categories';

@Injectable()
export class AdminService {

   constructor(
      private categoryService: CategoriesService,
      private questionService: QuestionsService
   ) { }

   getCategories(): Observable<object[]> {
      return this.categoryService.getAdminList();
   }


   getQuestions(): Observable<object[]> {
      return this.questionService.getList();
   }
}