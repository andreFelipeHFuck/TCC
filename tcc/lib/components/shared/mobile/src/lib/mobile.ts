import { 
  Injectable, 
  inject
} from '@angular/core';

import { toSignal } from '@angular/core/rxjs-interop';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class Mobile {
  private readonly breakpointObserver = inject(BreakpointObserver);

  public isMobile = toSignal(
    this.breakpointObserver
      .observe([Breakpoints.Handset])
      .pipe(map(result => result.matches))
  );
}
