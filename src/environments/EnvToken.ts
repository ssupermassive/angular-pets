import {InjectionToken} from '@angular/core';
import {IEnvironment} from './IEnvironment.model';

export const ENV_TOKEN = new InjectionToken<IEnvironment>(
    'app.environment.token'
);