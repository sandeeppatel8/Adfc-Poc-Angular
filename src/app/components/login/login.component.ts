import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { InteractionStatus, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { AzureAdService } from 'src/app/service/azure-ad.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isUserLoggedIn: boolean = false;
  userName?: string = '';
  private readonly _destroy = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private msalBroadCastService: MsalBroadcastService,
    private authService: MsalService,
    private azureAdSerice: AzureAdService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.msalBroadCastService.inProgress$.pipe(filter((interactionStatus: InteractionStatus) =>
      interactionStatus == InteractionStatus.None), takeUntil(this._destroy))
      .subscribe(x => {
        this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0;

        if (this.isUserLoggedIn) {
          this.userName = this.authService.instance.getAllAccounts()[0].name;
          var userInfo = this.authService.instance.getAllAccounts()[0];
          console.log('UserProfile =>', userInfo);

        }
        this.azureAdSerice.isUserLoggedIn.next(this.isUserLoggedIn);
      })
  }

  login() {
    if (this.msalGuardConfig.authRequest) {
      //this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest)
      this.router.navigate(['/home']);
    }
    else {
      this.authService.loginRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

}
