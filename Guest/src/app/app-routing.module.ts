import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { RoomComponent } from './room/room.component';
import { ContactComponent } from './contact/contact.component';
import { BookingComponent } from './booking/booking.component';
import { TestimonialComponent } from './testimonial/testimonial.component';
import { SuccessbookingComponent } from './successbooking/successbooking.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'room', component: RoomComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'booking', component: BookingComponent },
  { path: 'testimonial', component: TestimonialComponent },
  {path: 'successbooking', component: SuccessbookingComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
