import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService } from '../../services/auth.service';
import {User } from '../../models/user.class';
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user: User = new User();
  email: string;
  password: string;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async onRegister(){
    const user = await this.authService.onRegister(this.user);

    if(user){
      console.log('User created successfully');
      this.router.navigateByUrl('/home');
    }
  }

}
