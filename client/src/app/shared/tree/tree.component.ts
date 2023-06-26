import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatTreeNestedDataSource, MatTreeModule} from '@angular/material/tree';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

/**
 * Food data with nested structure.
 * Each node has a name and an optional list of children.
 */
export interface TreeNode {
  id: number;
  name: string;
  children?: TreeNode[];
}

const TREE_DATA: TreeNode[] = [
  {
    id: 4,
    name: 'Fruit',
    children: [
      {id: 1, name: 'Apple'},
      {id: 2, name: 'Banana'},
      {id: 3, name: 'Fruit loops'},
    ],
  },
  {
    id: 5,
    name: 'Vegetables',
    children: [
      {
        id: 6,
        name: 'Green',
        children: [
          {
            id: 7,
            name: 'Broccoli',
            children: [
              {
                id: 8,
                name: 'Apple',
                children: [
                  {id: 9, name: 'Apple'},
                  {id: 10, name: 'Banana'},
                  {id: 11, name: 'Fruit loops'},
                ],
              },
              {id: 12, name: 'Banana'},
            ],
          },
          {id: 13, name: 'Brussels sprouts'},
        ],
      },
      {
        id: 14,
        name: 'Orange',
        children: [
          {id: 15, name: 'Pumpkins'},
          {id: 16, name: 'Carrots'},
        ],
      },
    ],
  },
];

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnInit {
  @Input() data: TreeNode[] | undefined;
  @Output() childClick = new EventEmitter<number>();
  treeControl = new NestedTreeControl<TreeNode>((node) => node.children);
  dataSource = new MatTreeNestedDataSource<TreeNode>();

  constructor() {

  }

  ngOnInit() {
    if (this.data) {
      this.dataSource.data = this.data;
    }
  }

  onChildClick(id: number) {
    this.childClick.emit(id);
  }

  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;
}
