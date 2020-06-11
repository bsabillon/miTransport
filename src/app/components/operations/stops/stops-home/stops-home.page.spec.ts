import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StopsHomePage } from './stops-home.page';

describe('StopsHomePage', () => {
  let component: StopsHomePage;
  let fixture: ComponentFixture<StopsHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopsHomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StopsHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
