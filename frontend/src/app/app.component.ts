import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'books-angular-node';

  @ViewChild(LoginComponent)
  loginComponent: LoginComponent;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
  }

  

  logout() {

    this.authService.logout().subscribe(
      () => { 
        console.log('Logout from server');
        this.router.navigate(['/home'])
      }
      );
    }
}
