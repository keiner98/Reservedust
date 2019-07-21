import { Component } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";
import { Observable } from "rxjs";
import { map, share } from "rxjs/operators";

@Component({
  selector: "app-admin-nav",
  templateUrl: "./admin-nav.component.html",
  styleUrls: ["./admin-nav.component.scss"],
})
export class AdminNavComponent {
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      share()
    );
  constructor(private breakpointObserver: BreakpointObserver) {}
  opened: boolean = false;
  sidenavWidth = 4;
  ngOnInit() {}
  increase() {
    console.log(this.isHandset$);
    if (this.opened) {
      this.sidenavWidth = 15;
    } else {
      this.sidenavWidth = 15;
    }
  }
  decrease() {
    if (!this.opened) {
      this.sidenavWidth = 4;
    } else {
      this.sidenavWidth = 15;
    }
  }
  open() {
    this.opened = !this.opened;
  }
}
