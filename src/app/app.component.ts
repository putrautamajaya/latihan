import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {

  public daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30 ,31 ,30, 31];
  public nameOfMonth = ['January', 'Febuary', 'March', 'April', 'Mei', 'Juni', 'July', 'August', "September", 'October', 'November', 'December'];
  public calendarData = [];
  public daysCount;
  public month;
  public monthName;
  public selectedDateIndex;
  public randomColor;
  public selectedColorArr = [];
  public selectedEvent;
  public localStorageMemory;
  public date;
  public firstDay;
  public daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]
  public dayName;
  public lastDateOfMonthBefore;
  public daysOfMonthBeFore = [];
  public daysOfMonthNext = [];

  constructor() { }

  ngOnInit() {
    this.month = new Date().getMonth();
    this.monthName = this.nameOfMonth[this.month];
    this.daysCount = this.daysOfMonth[this.month];

    this.date = new Date();
    this.firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
    this.firstDay = this.firstDay.getDay();
    // this.dayName = this.dayOfWeek[this.firstDay]
    this.lastDateOfMonthBefore = this.daysOfMonth[this.month - 1];

    for(let i = (this.lastDateOfMonthBefore - this.firstDay + 2); i <= this.lastDateOfMonthBefore; i++){
      this.daysOfMonthBeFore.push(i);
    }

    let tempt = 35 - (this.daysCount + (this.firstDay - 1))
    for(let i = 1; i<=tempt; i++){
      this.daysOfMonthNext.push(i);
    }

    this.localStorageMemory = JSON.parse(localStorage.getItem('calendarData'));

    if(this.localStorageMemory === null){
      for(let i =0; i < this.daysCount; i++){
        this.calendarData.push({
          day: i,
          data: [],
        })
      }
    }

    else if (this.localStorageMemory !== null){
      this.calendarData = this.localStorageMemory;
    }
    
    console.log('daysCount', this.daysCount)
    console.log('day', this.dayName);
    console.log('lastDateOfMonthBefore', this.lastDateOfMonthBefore)
    console.log('daysOfMonthBeFore', this.daysOfMonthBeFore)
    console.log('daysOfMonthNext', this.daysOfMonthNext)
  }

  selectRandomColor = () => {
    var x= Math.round(0xffffff * Math.random()).toString(16);
    var y= (6-x.length);
    var z= '000000';
    var z1 = z.substring(0,y);
    this.randomColor= '#' + z1 + x;
    this,this.selectedColorArr.map( item => {
      if(this.randomColor === item){
        this.selectRandomColor();
        return
      }
    })
    this.selectedColorArr.push[this.randomColor];
  }

  selectedDate = (date) => {
    this.selectedDateIndex = date
    console.log('day', date)
  }

  addData = (name,time,email) => {
    if (this.selectedDateIndex >= 0 && name.value !==''){
      if(this.calendarData[this.selectedDateIndex].data.length < 3){
        this.selectRandomColor();
        let tempt = {
          name: name.value,
          time: time.value,
          email: email.value,
          color: this.randomColor,
          selectedDateIndex: this.selectedDateIndex,
        }
        this.calendarData[this.selectedDateIndex].data.push(tempt);
        console.log(this.calendarData[this.selectedDateIndex]);
        this.localStorage();
        alert("Event Added.");
      }
      else {
        alert("Can't add more than 3 event.");
      }
    }
    else if(!this.selectedDateIndex){
      alert('Please select a date.')
    }
    else if(name.value === ''){
      alert('Please fill name of Event.')
    }
  }

  displayEvent = (data) => {
    this.selectedEvent = data;
    console.log('slectedevent', this.selectedEvent)
  }

  closeEvent = () => {
    this.selectedEvent = null;
  }

  closeAddEvent = () => {
    this.selectedDateIndex = null;
  }

  editEvent = (nameEdit,timeEdit,emailEdit) => {
    this.calendarData[this.selectedEvent.selectedDateIndex].data[this.selectedEvent.dataArrIndex].name = nameEdit.value;
    this.calendarData[this.selectedEvent.selectedDateIndex].data[this.selectedEvent.dataArrIndex].time = timeEdit.value;
    this.calendarData[this.selectedEvent.selectedDateIndex].data[this.selectedEvent.dataArrIndex].email = emailEdit.value;
    this.localStorage();
    this.closeEvent();
    alert('Edit Event Success');
  }

  delete = () => {
    this.calendarData[this.selectedEvent.selectedDateIndex].data.splice(this.selectedEvent.dataArrIndex, 1);
    this.localStorage();
    this.closeEvent();
    alert('Delete Event Success')
  }

  localStorage = () => {
    localStorage.removeItem('calendarData');
    localStorage.setItem('calendarData', JSON.stringify(this.calendarData));
  }

  clearLocalStorage = () => {
    localStorage.removeItem('calendarData');    
  }

}
