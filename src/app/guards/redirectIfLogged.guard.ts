
  import { inject } from "@angular/core";
  import { Router } from "@angular/router";
  
  export const redirectIfLogged = () => {
    const router = inject(Router);
  
    if (localStorage.getItem("user_token")) {
      router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }
  