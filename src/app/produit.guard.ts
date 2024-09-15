// import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
// import { AuthService } from './services/auth/auth.service';

// export const produitGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
//   // Injectez Router dans votre guard
//   const router = new Router();

//   // Créez une instance de AuthService en lui passant Router
//   const authService = new AuthService(router);

//   if (authService.isAdmin()) {
//     return true;
//   } else {
//     router.navigate(['app-forbidden']);
//     return false;
//   }
// };
