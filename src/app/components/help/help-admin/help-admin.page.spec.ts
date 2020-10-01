import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HelpAdminPage } from './help-admin.page';

describe('HelpAdminPage', () => {
  let component: HelpAdminPage;
  let fixture: ComponentFixture<HelpAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HelpAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
