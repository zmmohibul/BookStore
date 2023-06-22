import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {ReplaySubject, Subject, take, takeUntil} from 'rxjs';
import {MatSelect} from '@angular/material/select';
import {environment} from '../../../environments/environment';
import {User} from '../../models/user';

import {AuthenticationService} from '../../services/authentication.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements OnInit, OnDestroy, AfterViewInit {
  @Output() select = new EventEmitter();
  @Output() close = new EventEmitter();
  public control: FormControl = new FormControl();
  public filterControl: FormControl = new FormControl();
  public filteredItems: ReplaySubject<any> = new ReplaySubject(1);

  @ViewChild('singleSelect', {static: true}) singleSelect:
    | MatSelect
    | undefined;
  baseUrl = environment.apiUrl;
  user: User | undefined;

  selectedId = 0;
  selectedData = {};

  @Input() searchUrl = `${this.baseUrl}/authors`;
  @Input() label = '';
  loading = false;
  items = [];

  protected _onDestroy = new Subject();

  constructor(
    private http: HttpClient,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.control.setValue('');

    this.filteredItems.next(this.items.slice());

    this.filterControl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });

    this.authenticationService.currentUser$.pipe(take(1)).subscribe({
      next: (response) => {
        if (response) {
          this.user = response;
        }
      },
    });
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  ngAfterViewInit() {
    this.setInitialValue();
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  ngOnDestroy() {
    this._onDestroy.next(true);
    this._onDestroy.complete();
  }

  onSubmit() {
  }

  onSelect() {
    const emitData = {prevId: this.selectedId, id: this.control.value.id};
    console.log(this.control.value);
    this.selectedId = this.control.value.id;
    this.selectedData = emitData;
    this.select.emit(emitData);
  }

  onClose() {
    this.close.emit(this.selectedId);
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  protected setInitialValue() {
    this.filteredItems
      .pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(() => {
        if (this.singleSelect) {
          this.singleSelect.compareWith = (a, b) => a && b && a.id === b.id;
        }
      });
  }

  /**
   * Write code on Method
   *
   * method logical code
   */
  protected filterBanks() {
    if (!this.items) {
      return;
    }

    let searchTerm = this.filterControl.value;

    if (!searchTerm) {
      this.filteredItems.next(this.items.slice());
      return;
    } else {
      searchTerm = searchTerm.toLowerCase();
    }

    let result: any = [];
    this.http.get(`${this.searchUrl}?searchTerm=${searchTerm}`).subscribe({
      next: (response: any) => {
        result = [...response.items];
        console.log(result);
        this.filteredItems.next(result.slice());
        this.items = result.slice();
        if (!result.length) {
          this.control.setValue({});
        }
      },
    });
  }
}
