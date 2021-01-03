import {
  Component,
  Input,
  HostListener,
  ChangeDetectionStrategy,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'ft-scroll-container',
  templateUrl: './scroll-container.component.html',
  styleUrls: ['./scroll-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollContainerComponent {

  @Input() showShadowOffset: number = 10;
  _showShadow: boolean = false;

  constructor(private hostElement: ElementRef) {}

  scrollHandler(event: {target: HTMLElement}): void {
    this._showShadow = event.target.scrollTop > this.showShadowOffset;
  }
}
