import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-box',
  templateUrl: './date-box.component.html',
  styleUrls: ['./date-box.component.css']
})
export class DateBoxComponent implements OnInit {

  @Input() item: any;
  @Input() randomColor: any;

  @Output() showData = new EventEmitter();

  constructor() { }

  public data0;
  public data1;
  public data2;

  ngOnInit() {
  }

  updateData = () => {
    if (this.item.data[0]) {
      this.data0 = {
        name: this.item.data[0].name,
        time: this.item.data[0].time,
        email: this.item.data[0].email,
        color: this.item.data[0].color,
        selectedDateIndex: this.item.data[0].selectedDateIndex,
        dataArrIndex: 0,
      }
    }
    if (this.item.data[1]) {
      this.data1 = {
        name: this.item.data[1].name,
        time: this.item.data[1].time,
        email: this.item.data[1].email,
        color: this.item.data[1].color,
        selectedDateIndex: this.item.data[1].selectedDateIndex,
        dataArrIndex: 1,
      }
    }
    if (this.item.data[2]) {
      this.data2 = {
        name: this.item.data[2].name,
        time: this.item.data[2].time,
        email: this.item.data[2].email,
        color: this.item.data[2].color,
        selectedDateIndex: this.item.data[2].selectedDateIndex,
        dataArrIndex: 2,
      }
    }
  }
}
