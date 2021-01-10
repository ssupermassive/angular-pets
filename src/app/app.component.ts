import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ft-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'quiz-app';
}
