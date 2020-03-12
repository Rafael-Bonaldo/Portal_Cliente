import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  public formUser: FormGroup;
  private error: string;
  private loading: boolean = false;
  private submitted: boolean = false;

  constructor( 
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createFormUser(new AuthUser());
  }

  public get f() { return this.formUser.controls; }

  private createFormUser(user: AuthUser): void {
    this.formUser = this.formBuilder.group({
      login: [user.login, Validators.required],
      password: [user.password, Validators.required]
    });
  }

  public signIn(): void {

    this.submitted = true;

    if (this.formUser.invalid) {
      return;
    }

    this.loading = true;
    this.authService.signIn(this.formUser.value)
    .subscribe(
      data => {
        this.router.navigate(['/list']);
        return true;
      },
      error => {
        this.error = error;
        this.loading = false;
      }
    )

    this.formUser.reset(new AuthUser());
  }

}
