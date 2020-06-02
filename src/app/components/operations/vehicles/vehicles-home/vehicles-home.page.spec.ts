import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VehiclesHomePage } from './vehicles-home.page';

describe('VehiclesHomePage', () => {
  let component: VehiclesHomePage;
  let fixture: ComponentFixture<VehiclesHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclesHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
