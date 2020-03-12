import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { first } from 'rxjs/operators';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public users: User[];

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.authService.listUsers()
      .subscribe(user => {
        this.users = user['data'];
      });
  }

}
