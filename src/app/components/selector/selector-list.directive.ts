import { Directive, HostListener } from '@angular/core';

/**
 * Директива, обеспечивающая взаимодействие диалога выбора
 * с вложенным в его контент списком
 */
@Directive({
  selector: '[selectorList]'
})
export class SelectorListDirective {

  selectComplete: (value: any) => void;

  @HostListener('itemClick', ['$event'])
  itemClickHandler(value: any): void {
    this.selectComplete(value);
  }
}
