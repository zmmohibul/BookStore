import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface SidebarItem {
  name: string;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  @Output() loadMore = new EventEmitter<boolean>();
  @Output() itemClick = new EventEmitter<number>();
  @Input() items: any = [];
  @Input() allItemsLoaded = false;
  @Input() loading = false;

  ngOnInit(): void {}

  onLoadMoreClicked() {
    this.loadMore.emit(true);
  }
}
