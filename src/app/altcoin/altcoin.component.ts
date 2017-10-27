import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-altcoin',
  templateUrl: './altcoin.component.html',
  styleUrls: ['./altcoin.component.scss']
})
export class AltcoinComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $('#sticky-item').sticky({ topSpacing: 0, bottomSpacing: 30 });
  }

}
