import { Injectable } from "@angular/core";
import { CanDeactivate } from "@angular/router";
import {CanComponentDeactivate} from './CanComponentDeactivate';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(
        component: CanComponentDeactivate,
        currentRoute: ActivatedRouteSnapshot,
        currentState: RouterStateSnapshot,
        nextState: RouterStateSnapshot
        ) {
        // проверяем наличие метода canDeactivate и вызов его.
        return component.canDeactivate ? 
        component.canDeactivate(currentRoute, currentState, nextState) : true;
    }
}