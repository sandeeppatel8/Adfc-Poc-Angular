import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalGuardConfiguration, MsalService, MSAL_GUARD_CONFIG } from '@azure/msal-angular';
import { AuthenticationResult, InteractionStatus, InteractionType, PopupRequest, RedirectRequest } from '@azure/msal-browser';
import { filter, Subject, takeUntil } from 'rxjs';
import { AzureAdService } from 'src/app/service/azure-ad.service';
import { StorageService } from '../../service/storage.service'

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
    private router: Router,
    private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.msalBroadCastService.inProgress$.pipe(filter((interactionStatus: InteractionStatus) =>
      interactionStatus == InteractionStatus.None), takeUntil(this._destroy))
      .subscribe(x => {
        this.isUserLoggedIn = this.authService.instance.getAllAccounts().length > 0;

        if (this.isUserLoggedIn) {
          this.userName = this.authService.instance.getAllAccounts()[0].name;
          var userEmail = this.authService.instance.getAllAccounts()[0].username;
          this.storageService.setItem("msal_user_email_demo=>", userEmail);

        }
        this.azureAdSerice.isUserLoggedIn.next(this.isUserLoggedIn);
      })
  }

  /*login() {
    if (this.msalGuardConfig.authRequest) {
      //this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest)
      this.router.navigate(['/home']);
    }
    else {
      this.authService.loginRedirect();
    }
  }*/


  login() {
    if (this.msalGuardConfig.interactionType === InteractionType.Popup) {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
            this.router.navigate(['/home']);
          });
      } else {
        this.authService.loginPopup()
          .subscribe((response: AuthenticationResult) => {
            this.authService.instance.setActiveAccount(response.account);
          });
      }
    } else {
      if (this.msalGuardConfig.authRequest) {
        this.authService.loginRedirect({ ...this.msalGuardConfig.authRequest } as RedirectRequest);
      } else {
        this.authService.loginRedirect();
      }
    }
  }

  ngOnDestroy(): void {
    this._destroy.next(undefined);
    this._destroy.complete();
  }

}
