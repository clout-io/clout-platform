import {
  Component, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output,
  ViewChild
} from '@angular/core';
import { FeedService } from '../../../../../services/feed';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-favorite-coin',
  templateUrl: './add-favorite-coin.component.html',
  styleUrls: ['./add-favorite-coin.component.scss']
})
export class AddFavoriteCoinComponent implements OnInit, OnChanges {
  public inputValue: string;
  private selectedValue: string;
  @ViewChild('favoriteBlock') favoriteBlock: ElementRef;
  @Input() showInput: boolean;
  @Output() onAddCoin = new EventEmitter();

  constructor(private feedService: FeedService) { }

  ngOnInit() {
  }

  ngOnChanges(): void {
    if (!this.showInput) {
      this.clearInput();
    }
  }

  clearInput(): void {
    this.inputValue = null;
    this.selectedValue = null;
  }

  hideInput(): void {
    this.showInput = false;
  }

  getRemoteData(value: string): Observable<Response> {
    return this.feedService.searchAltcoin(value);
  }

  selectValue(value: string): void {
    this.selectedValue = value;
  }

  addCoinToFavorites(): void {
    if (!this.showInput) { this.showInput = true; this.inputValue = ''; }

    if (this.showInput) {
      setTimeout(() => {
        this.favoriteBlock.nativeElement.querySelector('input').focus();
      }, 0);
    }

    if (!this.inputValue || this.inputValue.trim() === '') { return; }

    setTimeout(() => {
      this.favoriteBlock.nativeElement.querySelector('input').blur();
    }, 0);
    this.showInput = true;
    const value = this.inputValue.trim();
    this.onAddCoin.emit({
      value,
      hideInput: () => {
        this.clearInput();
        this.hideInput();
      }
    });
  }

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (this.showInput && this.inputValue.trim() === '') {
      const contains = this.favoriteBlock.nativeElement.contains(targetElement);
      if (!contains) {
        this.inputValue = null;
        this.selectedValue = null;
        this.showInput = false;
      }
    }
  }

}
