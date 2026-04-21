import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { CategoryDetailsComponent } from './features/categories/category-details/category-details.component';
import { CategoryListComponent } from './features/categories/category-list/category-list.component';
import { SessionsComponent } from './features/sessions/sessions.component';
import { SessionDetailsComponent } from './features/sessions/session-details/session-details.component';
import { SessionCreateComponent } from './features/sessions/session-create/session-create.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  //canActivate: [authGuard]

  { path: "", redirectTo: 'home', pathMatch: 'full' },
   
  { path: "home", component: HomeComponent },

  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [authGuard] },

  { path: "categories-home", component: CategoriesComponent }, 
  { path: "categories", component: CategoryListComponent }, 
  { path: "category-details", component: CategoryDetailsComponent },
//to change details to :id after...done with dev purposses

  { path: "sessions-home", component: SessionsComponent }, 
  { path: "create-session", component: SessionCreateComponent, canActivate: [authGuard]}, 
  { path: "session-details/:id", component: SessionDetailsComponent },
  //to change details to :id after...done with dev purposses 
  // { path: "edit-session", component: SessionCreateComponent, canActivate: [authGuard]}, 

  { path: "**", component: NotFoundComponent },

]






