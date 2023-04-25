import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { WeatherComponent } from './components/weather/weather.component';
import { HomeComponent } from './home/home.component'
const routes: Routes = [
  {
    path: 'home', component: HomeComponent,canActivate: [MsalGuard] ,
    children: [
      { path: 'weather', component: WeatherComponent,canActivate: [MsalGuard] }
    ]
  },

  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
