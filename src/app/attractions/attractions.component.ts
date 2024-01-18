// attractions.component.ts
import { Component, AfterViewInit } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-attractions',
  templateUrl: './attractions.component.html',
  styleUrls: ['./attractions.component.css'],
})
export class AttractionsComponent implements AfterViewInit {
  map: any;
  selectedAttraction: any;

  lat = 45.7589;
  lng = 21.2187;
  zoom = 13;

  attractions = [
    { name: 'Banat Village Museum', lat: 45.777373626172945, lng: 21.266074054282427, image: 'assets/img/MuzeulSatului.jpg', description:'The Banat Village Museum is an open-air ethnographic museum in northeastern Timișoara, at the edge of the Green Forest. Spread over an area of 17 ha, the museum is designed as a traditional Banat village and includes peasant households belonging to various ethnic groups in Banat (Romanians, Slovaks, Swabians, Ukrainians, Hungarians, etc.), buildings with social function of the traditional village (town hall, school, church, etc.), folk art installations and workshops.' },
    { name: 'Orthodox Cathedral', lat: 45.7514118958542,  lng: 21.224440121996242, image: 'assets/img/OrthodoxCathedral.jpg', description:'The Orthodox Cathedral , also known as the Metropolitan Cathedral , is a Romanian Orthodox church in Timișoara. The cathedral is the seat of the Archbishopric of Timișoara and the Metropolis of Banat. It is dedicated to the Three Holy Hierarchs, Basil the Great, Gregory the Theologian and John Chrysostom.Built on an area of 1,542 m2, it has 11 towers, of which the central one has a height of 90.5 m, making it the second tallest church in Romania.' },
    { name: 'Union Square', lat: 45.758077065661496,  lng:21.228987925716627 , image: 'assets/img/UnionSquare.jpg', description:'Union Square , also known as Dome Square , is the oldest square in Timișoara. It was named in honor of the Romanian troops that entered Timișoara on 3 August 1919 and established the Romanian administration, thus finalizing the union of Banat with Romania. Initially, it was called Losonczy Square, after Count István Losonczy who was killed by the Turks in 1552, when the fortress was conquered.' },
    { name: 'Memorial Museum of the 1989 Revolution', lat: 45.76018526482412,  lng:21.23148620365962 , image: 'assets/img/1989RevolutionMuseum.jpg', description:'Museum of the Revolution in Timisoara - Memorialul Revolutiei aims to keep alive the memory of the Martyr Heroes as well as to find out the truth about the events of December 1989 when there were fights between the peaceful demonstrators and the repressive forces. It features a complex of monuments with 12 monuments and several exhibition halls where various exhibitions are organised. The exhibitions cover the events of December 1989 both at a national and an international level.' },
    { name: 'Huniade Castle', lat: 45.753177991091775,  lng:21.22726911222363 , image: 'assets/img/HuniadeCastle.jpg' , description:'The Huniade Castle is the oldest monument in Timișoara, Romania, built between 1443 and 1447 by John Hunyadi and Paolo Santini de Duccio over the old royal castle dating from the 14th century (built during the reign of Charles I Robert). The castle was rebuilt by the Turkish pashas in the 17th century and by Prince Eugene of Savoy in the 18th century. The structure owes its present appearance to the 1850s reconstruction campaign. It houses the History, Archeology and Natural Sciences sections of the National Museum of Banat.'},
    { name: 'St. George\'s Cathedral', lat: 45.75830620666228,  lng:21.230051181537565 , image: 'assets/img/StGeorgesCathedral.jpg', description:'The St. George Cathedral, colloquially known as the Roman Catholic Dome, is the cathedral of the Roman Catholic Diocese of Timișoara and one of the city\'s landmarks. The cathedral is dedicated to St. George and was built between 1736 and 1774. After the Cathedral Basilica of Oradea, it is the second largest Baroque religious building in Southeastern Europe. Liturgies in Hungarian, German and Romanian are currently held regularly in the cathedral. Due to the remarkable acoustics, organ concerts are also held here.' },
    { name: 'Botanic Park', lat: 45.76034971565623,  lng:21.22530149688082, image: 'assets/img/BotanicPark.jpg' , description:'The Botanical Park, since 2007 the Botanical Garden, is an arboretum in Timișoara. Up to its development in the 1900s, the land on which the park is located today was used as a training ground for military exercises. Much earlier, the land was supposedly the site of a Roman cemetery. In 1995 it was declared a scientific reserve, in order to protect the local and exotic flora.'},
    { name: 'Victory Square', lat: 45.75387014937471 , lng: 21.225747983477987, image: 'assets/img/VictorySquare.jpg' , description:'The Victory Square, known until 1990 as the Opera Square, is the central square of Timișoara. It is the place where Timișoara was proclaimed on 20 December 1989 the first city free of communism in Romania. It was a main boulevard, transformed into a square after the closure of the southern side by the construction of the Metropolitan Cathedral. The opposite poles of the square consist of the Opera to the north and the Metropolitan Cathedral to the south. ' },
    // Add more attractions as needed
  ];

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap(): void {
    this.map = new google.maps.Map(document.getElementById('google-map'), {
      center: { lat: this.lat, lng: this.lng },
      zoom: this.zoom,
    });

    this.attractions.forEach(attraction => {
      const marker = new google.maps.Marker({
        position: { lat: attraction.lat, lng: attraction.lng },
        map: this.map,
        title: attraction.name,
      });

      const infowindow = new google.maps.InfoWindow({
        content: `
          <div style="width: 200px; height: 130px;  position: relative;  ">
            <h3 style="color: white; position: absolute; margin-left: auto; margin-right: auto; bottom: -10px; left: 10px;  z-index: 2;">${attraction.name}</h3>
            <img src="${attraction.image}" alt="${attraction.name}" style="width:100%;height:100%; object-fit: cover; border-radius: 8px;">
            <div style="position: absolute;  bottom: 0; left: 0; right: 0; height: 40%; background: linear-gradient(to bottom, transparent, black); border-radius: 8px;"></div>
          </div>
        `,
        disableAutoPan: true,
      });

      marker.addListener('mouseover', () => {
        infowindow.open(this.map, marker);
      });

      marker.addListener('mouseout', () => {
        infowindow.close();
      });

      marker.addListener('click', () => {
        
        this.showDetails(attraction);
      });
      
        
    
    });
  }

  showDetails(attraction: any): void {
    this.selectedAttraction = attraction;

    const detailsContainer = document.getElementById('details-container')!;
    detailsContainer.style.display = 'flex';

    // Remove the 'fade-in' class if it exists
    detailsContainer.classList.remove('custom-class');

    // Trigger reflow to restart the animation
    void detailsContainer.offsetWidth;

    // Add the 'fade-in' class to start the animation
    detailsContainer.classList.add('custom-class');


}
}
