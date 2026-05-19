import {Component, inject} from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {BreakpointObserver} from '@angular/cdk/layout';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { NAV_ITEMS } from './core/constants/nav-items';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {
  private breakPointObserver = inject(BreakpointObserver);
  readonly navItems = NAV_ITEMS;

  isMobile = toSignal(
    this.breakPointObserver.observe('(max-width: 768px)').pipe(
      map(result => result.matches)
    )
  );
}
