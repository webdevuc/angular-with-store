import { Observable } from 'rxjs';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { UserFormComponent } from './user-form/user-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from './user.modal';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'userapp';
  users: Observable<User[]>;
  
  constructor(public dialog: MatDialog, private store: Store<AppState>) { 
    this.users = this.store.select(state => state.user);
    console.log('user', this.users);
  }

  ngOnInit(): void {
    this.users = this.store.select(state => state.user);
  }

  openUserDialog() {
    this.dialog.open(UserFormComponent, { width: '800px' });
  }

}
