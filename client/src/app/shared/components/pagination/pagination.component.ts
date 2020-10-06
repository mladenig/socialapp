import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PageChangedEvent} from 'ngx-bootstrap';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

/**
 * Not working for now. Prepared for big data
 */
export class PaginationComponent implements OnInit {

  @Input() contentArray: any[];
  @Input() returnedArray: any[];
  @Input() fullArrayLength: number;

  @Output() startEndItem = new EventEmitter<any>();

  ngOnInit(): void {
  }

  public pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.startEndItem.emit({startItem, endItem});
  }

}
