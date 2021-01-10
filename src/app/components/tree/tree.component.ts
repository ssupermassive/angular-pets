import {
  Component,
  OnChanges,
  Input,
  Output,
  SimpleChanges,
  TemplateRef,
  EventEmitter,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTree } from '@angular/material/tree';
import { IRowAction, ITreeRowData } from '../list-base';

enum NODE_LEVEL {
  FIRST,
  SECOND
}

interface ITreeNode {
  level: number;
  expandable: boolean;
  children: ITreeNode[]
}

/**
 * Двууровневое дерево
 */
@Component({
  selector: 'ft-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeComponent implements OnChanges {

  @Input() dataSource: any[];
  @Input() displayProperty: string;
  @Input() keyProperty: string;
  @Input() parentProperty: string;
  @Input() nodeProperty: string;
  @Input() rowTemplate: TemplateRef<HTMLElement>;
  @Input() rowActions: IRowAction[];
  @Input() markedKey: number;

  @Output() itemClick: EventEmitter<object>;

  @ViewChild('tree') tree: MatTree<any>;

  _treeControl: FlatTreeControl<any>;
  _treeFlattener: MatTreeFlattener<any, any>;
  _dataSource: MatTreeFlatDataSource<FlatTreeControl<any>, MatTreeFlattener<any, any>>;

  constructor(private changeDetector: ChangeDetectorRef) {
    this.itemClick = new EventEmitter();
  }

  ngOnChanges(changes: SimpleChanges): void {

    const { dataSource } = changes;

    if (dataSource && dataSource.currentValue !== dataSource.previousValue) {
      this._updateState(dataSource.currentValue);
    }
  }

  private _updateState(dataSource: any[]): void {
    this._createFlattener();
    this._createTreeControl();
    this._createDataSource(dataSource);
  }

  /**
   * Создаёт контроллер дерева, отвечающий за уровни и разворот
   */
  private _createTreeControl(): void {
    if (!this._treeControl) {
      this._treeControl = new FlatTreeControl(
        // определяет на каком уровне вложенности находится элемент
        (treeNode) => {
          return treeNode.expandable ? NODE_LEVEL.FIRST : NODE_LEVEL.SECOND;
        },
        // определяет, можно ли равернуть переданный узел
        (treeNode) => {
          return treeNode.expandable;
        }
      );
      return;
    }
  }

  private _createFlattener(): void {
    if (!this._treeFlattener) {
      this._treeFlattener = new MatTreeFlattener(
        (node: ITreeNode, level: number) => {
          const nodeData = {
            level,
            expandable: node[this.nodeProperty],
            item: node
          };
          return nodeData;
        },
        (node) => node.level,
        (node) => node.expandable,
        (node) => node.children
      );
    }
  }

  /**
   * Создает источник данных для дерева
   * @param dataSource - Данные, на основе которых будет строиться дерево
   */
  private _createDataSource(data: any[]): void {

    const items = data.filter((item) => {
      return !item[this.parentProperty];
    });

    items.forEach((node) => {
      if (node[this.nodeProperty]) {
        node.children = data.filter((item) => {
          return item[this.parentProperty] === node[this.keyProperty];
        });
        return;
      }
      node.children = null;
    });


    if (!this._dataSource) {
      const dataSource = new MatTreeFlatDataSource(this._treeControl, this._treeFlattener);
      dataSource.data = items;
      this._dataSource = dataSource;
    } else {

      // если уже есть источник данных, то пройдемся по старым данным и выясним, какие узлы развернуты
      // что бы после изменения данных развернуть их снова
      const expanded = [];
      this._treeControl.dataNodes.forEach((dataNode: ITreeRowData) => {
        if (this._treeControl.isExpanded(dataNode)) {
          expanded.push(dataNode.item[this.keyProperty]);
        }
      });

      this._dataSource.data = items;

      if (expanded.length) {
        this._treeControl.dataNodes.forEach((dataNode: ITreeRowData) => {
          const key = dataNode.item[this.keyProperty];
          const children = dataNode.item.children;
          if (expanded.indexOf(key) !== -1 && children && children.length) {
            this._treeControl.expand(dataNode);
          }
        });
        
      }
    }
  }

  hasChild = (_: number, node) => node.expandable;

  rowClickHandler(itemData: ITreeRowData): void {
    this.markedKey = itemData.item[this.keyProperty];
    this.itemClick.emit(itemData.item);
  }
}
