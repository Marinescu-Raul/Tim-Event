import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EventService } from '../services/event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { MyEvent } from '../event';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [DatePipe] // Add DatePipe to providers
})
export class ContactComponent {
  addForm: any;
  minEndDateValue: string | undefined;
  events: any;
  id: number | undefined;

  minStartDate(): string {
    const today = new Date();
    // Format the date in the 'yyyy-MM-dd' format expected by the input[type="date"]
    const formattedDate = today.toISOString().split('T')[0];
    return formattedDate;
  }

  // updateMinEndDate(): void {
  //   // When the startDate changes, update the minimum allowed endDate
  //   this.minEndDate = this.addForm.value.startDate;
  // }

  // minEndDate(): string {
  //    return this.minEndDate;
  // }

  // Inject EventService and DatePipe in the constructor
  constructor(private eventService: EventService, private datePipe: DatePipe) {}


  ngOnInit() {
    let resp=this.eventService.getEvents();
    resp.subscribe((data)=>this.events=data);
  }

  onSubmit(addForm: NgForm): void {
    addForm.value.organizer = "private";
    

    // Format the start and end dates before sending them to the server
    addForm.value.startDate = this.datePipe.transform(addForm.value.startDate, 'yyyy-MM-dd');
    addForm.value.endDate = this.datePipe.transform(addForm.value.endDate, 'yyyy-MM-dd');

    this.eventService.addEvent(addForm.value).subscribe(
      (response: MyEvent) => {
        alert(response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );

    addForm.reset();
  }




  public deleteEvent(id:number){
    let resp= this.eventService.deleteEvent(id);
    resp.subscribe((data)=>this.events=data);
   }

   public findEventById(id:number){
    let resp= this.eventService.getEventById(id);
    resp.subscribe((data)=>this.events=data);
   }



}
