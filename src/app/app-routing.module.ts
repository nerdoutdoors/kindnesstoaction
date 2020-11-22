import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_components/auth';
import { HomeComponent } from './_components/home/home.component';
import { BlogComponent } from './_components/blog/blog.component';

const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'blog', component: BlogComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
