import { Component, OnInit, Query } from '@angular/core';
import { PublishersService } from '../../../../services/publishers.service';
import { ToastrService } from 'ngx-toastr';
import { PaginatedList } from '../../../../models/paginatedList';
import { Publisher } from '../../../../models/publisher/publisher';
import { PaginationParams } from '../../../../models/paginationParams';
import { PageEvent } from '@angular/material/paginator';
import { QueryParams } from '../../../../models/queryParams';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss'],
})
export class PublisherListComponent implements OnInit {
  publishersList: PaginatedList<Publisher> | undefined;
  queryParams = new QueryParams();
  loading = false;

  constructor(
    private publisherService: PublishersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.publishersList = new PaginatedList<Publisher>();
    this.queryParams.pageSize = 5;
    this.loadPublishers();
  }

  loadPublishers() {
    this.loading = true;
    this.publisherService.getAllPublishers(this.queryParams).subscribe({
      next: (response) => {
        this.publishersList = { ...response };
        this.loading = false;
      },
    });
  }

  deletePublisher(publisher: Publisher) {
    this.publisherService.deletePublisher(publisher.id).subscribe({
      next: () => {
        if (this.publishersList) {
          this.publishersList.items = this.publishersList.items.filter(
            (item) => item.id != publisher.id
          );
          this.publishersList.count = this.publishersList.items.length;
        }
        this.toastr.success(`Publisher ${publisher.name} deleted...`);
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.queryParams.pageNumber = event.pageIndex + 1;
    this.queryParams.pageSize = event.pageSize;
    this.loadPublishers();
  }
}
