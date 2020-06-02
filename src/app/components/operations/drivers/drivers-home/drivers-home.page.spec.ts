import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DriversHomePage } from './drivers-home.page';

describe('DriversHomePage', () => {
  let component: DriversHomePage;
  let fixture: ComponentFixture<DriversHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriversHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DriversHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
