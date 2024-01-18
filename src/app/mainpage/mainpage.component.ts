import { Component, ElementRef, Renderer2, ViewChild, OnInit, HostListener } from '@angular/core';
import 'scroll-restoration-polyfill';
import { EventService } from '../services/event.service';
import { MyEvent } from '../event';
import { User } from '../user';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-mainpage',
templateUrl: './mainpage.component.html',
styleUrls: ['./mainpage.component.css']
})
export class mainpageComponent implements OnInit {


cards: MyEvent[] = [];
user?: User;
// card: MyEvent;


@HostListener('window:scroll', ['$event'])
onScroll(event: Event) {
  this.handleScroll();
}



handleScroll() {
  
  const scrollPosition = window.scrollY;
  const navbar = document.querySelector('.navbar') as HTMLElement;

  if (scrollPosition > 100) {
    navbar.style.position = 'fixed';
    navbar.style.top = '5px';
    navbar.style.height = '40px';
    navbar.style.width = '975px';
    navbar.style.backgroundColor = 'rgb(255, 0, 0)';

    navbar.style.left = '50%'; // Center horizontally
    navbar.style.transform = 'translateX(-50%)';
  } else {
    navbar.style.position = 'static';
    navbar.style.height = 'initial';
    navbar.style.width = 'initial';
    navbar.style.left = 'auto'; // Reset the left position
  navbar.style.transform = 'none'; // Reset the height to its initial value
  }
}

@ViewChild('myPhoto', { static: true }) myPhoto!: ElementRef;

photos: string[] = ['assets/img/Timisoara1.jpg', 'assets/img/Timisoara2.jpg', 'assets/img/Timisoara3.jpg'];
currentPhotoIndex: number = 0;
containerStyle: any;

shouldFixNavbar(): boolean {
  // Add logic here to determine whether to apply the fixed class or not
  // For example, you can check if the user has scrolled down a certain distance
  const scrollY = window.scrollY || document.documentElement.scrollTop;

  // Adjust the threshold as needed
  return scrollY > 100;
}


constructor(private renderer: Renderer2, private eventService: EventService, private userService: UserService, private router: Router) {}

navigateToDetails(card: MyEvent) {
  this.router.navigate(['/eventDetails'], { state: { card } });
}

ngOnInit(): void {
  this.setContainerBackground();
  this.eventService.getEvents().subscribe(result => {
    console.log(result);
    this.cards = result;
  });


  this.startImageChangeTimer();
}

setContainerBackground(): void {
  this.containerStyle = {
    'background-image': `url('${this.photos[this.currentPhotoIndex]}')`,
    'background-size': 'cover',
    'background-position': 'center',
    'height': '400px',
    'opacity': '1', // Set initial opacity to 1
    'transition': 'opacity 0.5s ease-in-out' // Faster transition
  };
}

changePhoto(direction: 'next' | 'previous'): void {
  const photoElement: HTMLElement = this.myPhoto.nativeElement;

  // Set opacity to 0 to initiate the fade-out effect
  this.containerStyle.opacity = '0';

  // Wait for a short time before changing the photo source and gradually increasing opacity
  setTimeout(() => {
    // Update the current photo index after the delay
    if (direction === 'next') {
      this.currentPhotoIndex = (this.currentPhotoIndex + 1) % this.photos.length;
    } else {
      this.currentPhotoIndex = (this.currentPhotoIndex - 1 + this.photos.length) % this.photos.length;
    }

    
    this.setContainerBackground();

    
    this.renderer.addClass(photoElement, 'fade-in');
  }, 250); // Adjust the duration of the delay to match the CSS transition duration
}


startImageChangeTimer(): void {
  setInterval(() => {
    this.changePhoto('next');
  }, 5000); // Change image every 5 seconds
}



}
