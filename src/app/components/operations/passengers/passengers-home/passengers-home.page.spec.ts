import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PassengersHomePage } from './passengers-home.page';

describe('PassengersHomePage', () => {
  let component: PassengersHomePage;
  let fixture: ComponentFixture<PassengersHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassengersHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PassengersHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
