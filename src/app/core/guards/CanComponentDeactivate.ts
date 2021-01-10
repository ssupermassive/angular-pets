import { Observable } from "rxjs";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

/**
 * Интерфейс, который должен реализовывать компонент для работы с гардом canDeactivate
 */
export interface CanComponentDeactivate {
    canDeactivate: (
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
    ) => Observable<boolean> | Promise<boolean> | boolean;
}