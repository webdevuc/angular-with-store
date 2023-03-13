import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../user.modal';
import { AppState } from './../app.state';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  public users: Observable<User[]>;
  profileForm!: FormGroup;
  constructor(private dilogRef: MatDialogRef<UserFormComponent>, private formBuilder: FormBuilder, private store: Store<AppState>) {
    this.users = this.store.select(state => state.user);
    console.log(' this.users',  this.users);
  }

  ngOnInit(): void {
    this.createNewForm();
  }

  createNewForm() {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  onProfileFormSubmit() {
    let params = this.profileForm.value;
    this.store.dispatch({
      type: 'ADD_USER',
      payload: <User>{
        name: params.name,
        email: params.email
      }
    });
    this.dilogRef.close();
  }
}
