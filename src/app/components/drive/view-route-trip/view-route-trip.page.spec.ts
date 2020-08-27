import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewRouteTripPage } from './view-route-trip.page';

describe('ViewRouteTripPage', () => {
  let component: ViewRouteTripPage;
  let fixture: ComponentFixture<ViewRouteTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRouteTripPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRouteTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
