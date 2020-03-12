import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  private error: string;
  private loading: boolean = false;
  private submitted: boolean = false;

  public formUser: FormGroup;

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.createFormUser(new User());
  }

  public get f() { return this.formUser.controls; }

  private createFormUser(user: User): void {
    this.formUser = this.formBuilder.group({
      fullName: [user.fullName, Validators.required],
      cpf: [user.cpf, Validators.required],
      phone: [user.phone, Validators.required],
      login: [user.login, Validators.required],
      email: [user.email, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      password: [user.password,  Validators.compose([
        Validators.required,
        Validators.minLength(6)
      ])]
    });
  }

  public registerNewUser(): void {

    this.submitted = true;

    if (this.formUser.invalid) {
      return;
    }

    this.loading = true;
    this.authService.registerNewUser(this.formUser.value)
    .pipe(first())
    .subscribe(
      data => {
        this.router.navigate(['/'], { queryParams: { registered: true } });
      },
      error => {
        setTimeout(() => {
          this.error = error.error['message'];
        }, 500);
        this.loading = false;
      }
    )

    this.formUser.reset(new User());
  }


}
