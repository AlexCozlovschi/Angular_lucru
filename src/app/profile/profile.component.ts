import {Component} from '@angular/core';
import {LocalService} from '../services/local.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  constructor() {

    if (localStorage.getItem('user') == null) {
      window.location.href = '#/login';
    }

  }

}
