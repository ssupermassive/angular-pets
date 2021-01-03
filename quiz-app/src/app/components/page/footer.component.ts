import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ft-page-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

  _currentYear: number = new Date().getFullYear();
}
