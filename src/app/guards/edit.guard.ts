import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";

export class EditGuard implements CanActivate {
    mark: string;
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        this.mark = route.params["mark"];
        if (+this.mark === 5) {
        alert ("Нельзя редактировать студента со средним баллом = 5");
        return false;
        }
        return true;
    }
}
