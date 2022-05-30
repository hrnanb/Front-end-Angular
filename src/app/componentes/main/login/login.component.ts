import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService} from '../../../servicios/auth.service'
import { TokenService } from '../../../servicios/token.service';
import { LoginUsuario } from '../../../models/login-usuario';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = false;
  isLoginFail = false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }



  onLogin(): void {
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);



    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = false;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
        this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000
        });
        this.router.navigate(['/']);
        console.log(this.roles)
      },
      err => {
        this.isLogged = false;
        this.errMsj = err.message;
        // this.toastr.error(this.errMsj, 'Fail', {
        //   timeOut: 3000
        // });
        console.log(err.message);
        console.log(this.nombreUsuario + ' ' + this.password )
        console.log(this.roles)


      }
    );
  }

}
