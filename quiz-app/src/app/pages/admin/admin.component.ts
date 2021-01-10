import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

interface IAdminTab {
  name: string,
  route: string
}

/**
 * Кабинет администратора
 * @author Серпаков С.А.
 */
@Component({
  selector: 'ft-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  tabs: IAdminTab[] = [
    { route: '/categories', name: 'По категориям' },
    { route: '/feedback', name: 'Обратная связь' }
  ];

  selectedIndex: number;

  ngOnInit() {
    this._updateSelectedIndex();
  }

  /**
   * Обработчик события изменения выбранной вкладки
   * @param event
   */
  _changeSelectedTadHandler(event: { index: number }): void {
    this.router.navigate(['/admin' + this.tabs[event.index].route]);
    this._updateSelectedIndex(event.index);
  }

  private _updateSelectedIndex(newIndex?: number) {
    if (typeof newIndex === 'number') {
      this.selectedIndex = newIndex;
      return;
    }

    const currentRoute = this.router.routerState.snapshot.url.replace('/admin', '');

    if (currentRoute) {
      this.tabs.forEach((tab: IAdminTab, index: number) => {
        if (tab.route === currentRoute) {
          this.selectedIndex = index;
        }
      });
    }
  }
}
