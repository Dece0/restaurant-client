import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { faKey } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    faKey = faKey;

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required]),
    });

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    login() {
        if (!this.loginForm.valid) return;
        const values = this.loginForm.value;
        this.authService
            .login(values.email, values.password)
            .subscribe(
                _ => {
                    this.router.navigateByUrl('/');
                }
            );
    }
}
