import { SubscriptionModel } from './../subscriptions.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PortalService } from '../portal.service';
import { Subscription, Observable } from 'rxjs';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit, OnDestroy {
  protected loading$: Observable<boolean>;

  protected subscriptions: SubscriptionModel[];

  private subSubscription: Subscription;

  constructor(private portalService: PortalService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loading$ = this.portalService.loading;
    this.route.params.subscribe(param => {

      this.subSubscription = this.portalService.getAllSubscriptions(param.id).subscribe((subscriptions: SubscriptionModel[]) => {
        this.subscriptions = subscriptions;
      });
    });
  }

  ngOnDestroy() {
    this.subSubscription.unsubscribe();
  }
}
