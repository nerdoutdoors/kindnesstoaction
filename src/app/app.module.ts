// all angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';

// all app modules
import { routing } from './app-routing.module';

// all guards
import { AuthGuard } from './_guards/auth.guard';

// all intercepters
import { JwtInterceptor, ErrorInterceptor } from './_helpers';

// all services
import { AuthenticationService, FileService } from './_services';

// all components
import { AppComponent } from './_components/app.component';
import { LoginComponent, RegisterComponent, ForgotPasswordComponent, ResetPasswordComponent } from './_components/auth/index';
import { NavigationComponent } from './_components/navigation/navigation.component';
import { HomeComponent } from './_components/home/home.component';
import { HeroComponent } from './_components/hero/hero.component';
import { CauseComponent } from './_components/cause/cause.component';
import { PicturesComponent } from './_components/pictures/pictures.component';
import { SupportComponent } from './_components/support/support.component';
import { SocialComponent } from './_components/social/social.component';
import { BlogComponent } from './_components/blog/blog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { AmbassadorAndCoinComponent } from './_components/ambassador-and-coin/ambassador-and-coin.component';
import { Points } from './_components/ambassador-and-coin/points';
import { ScriptService } from './_services/script.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    NavigationComponent,
    HomeComponent,
    HeroComponent,
    HeroComponent,
    CauseComponent,
    PicturesComponent,
    SupportComponent,
    SocialComponent,
    BlogComponent,
    AmbassadorAndCoinComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
    HttpClientModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    LayoutModule,
    MatFormFieldModule,
    MatCardModule,
    MatIconModule,
    MatInputModule, MatOptionModule, MatSelectModule, MatIconModule,
    FormsModule, MatTabsModule, MatButtonModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthGuard,
    AuthenticationService,
    FileService,
    Points,
    ScriptService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
