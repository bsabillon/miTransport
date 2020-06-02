import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TripsHomePage } from './trips-home.page';

describe('TripsHomePage', () => {
  let component: TripsHomePage;
  let fixture: ComponentFixture<TripsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripsHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TripsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
