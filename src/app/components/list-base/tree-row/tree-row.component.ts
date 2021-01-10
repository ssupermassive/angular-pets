import { Component, Input, ChangeDetectionStrategy} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { BaseRowComponent } from '../base-row/base-row.component';

@Component({
  selector: 'ft-tree-row',
  templateUrl: './tree-row.component.html',
  styleUrls: ['./tree-row.component.scss'],
  // ToDo дефолтное обнаружение изменений, т.к. при обновлении сорса в дереве не пересоздается treeControl,
  // что бы сохранить развернутые узлы. Надо придумать что с этим делать.
  changeDetection: ChangeDetectionStrategy.Default
})
export class TreeRowComponent extends BaseRowComponent {
  @Input() treeControl: FlatTreeControl<any>;

  toggleNode(event: Event, data: object): void {
    event.stopPropagation();
    this.treeControl.toggle(data);
  }
}
