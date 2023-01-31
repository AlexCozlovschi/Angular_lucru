import {Component} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMessage: string = '';

  constructor() {
    localStorage.clear()
  }

  public login(username: string, password: string) {
    if (username == 'Admin' && password == '12345') {
      this.startSesion(username);
    } else {
      this.errorMessage = 'Username or password entered incorrectly ';
    }
  }

  startSesion(user: any) {

    localStorage.setItem("user", user);
    window.location.href = '#/profile';
  }

}
