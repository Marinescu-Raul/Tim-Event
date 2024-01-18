import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyEvent } from '../event';


@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit{
  selectedCard!: MyEvent; 

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.selectedCard = history.state.card;
    });
  }




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

  shouldFixNavbar(): boolean {
    // Add logic here to determine whether to apply the fixed class or not
    // For example, you can check if the user has scrolled down a certain distance
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    // Adjust the threshold as needed
    return scrollY > 100;
  }
}
