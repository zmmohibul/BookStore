import { Component, OnInit } from '@angular/core';
import { PublishersService } from '../../../../services/publishers.service';
import { ToastrService } from 'ngx-toastr';
import { PaginatedList } from '../../../../models/paginatedList';
import { Publisher } from '../../../../models/publisher/publisher';
import { PaginationParams } from '../../../../models/paginationParams';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-publisher-list',
  templateUrl: './publisher-list.component.html',
  styleUrls: ['./publisher-list.component.scss'],
})
export class PublisherListComponent implements OnInit {
  publishersList: PaginatedList<Publisher> | undefined;
  paginationParams = new PaginationParams();
  loading = false;

  constructor(
    private publisherService: PublishersService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.publishersList = new PaginatedList<Publisher>();
    this.paginationParams.pageSize = 5;
    this.loadPublishers();
  }

  loadPublishers() {
    this.loading = true;
    this.publisherService.getAllPublishers(this.paginationParams).subscribe({
      next: (response) => {
        this.publishersList = response;
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
        }
        this.toastr.success(`Publisher ${publisher.name} deleted...`);
      },
    });
  }

  onPageChange(event: PageEvent) {
    this.paginationParams.pageNumber = event.pageIndex + 1;
    this.paginationParams.pageSize = event.pageSize;
    this.loadPublishers();
  }
}
