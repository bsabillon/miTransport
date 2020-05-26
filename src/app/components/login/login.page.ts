import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService } from '../../services/auth.service';
import {User } from '../../models/user.class';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user: User = new User();
  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onLogin(){
    const user = await this.authService.onLogin(this.user);

    if(user){
      this.router.navigateByUrl('/home');
      console.log('User logged in successfully');
    }
  }

}
