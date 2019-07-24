import { Component, OnInit, Input, Optional, Host } from "@angular/core";
import { SatPopover } from "@ncstate/sat-popover";
import { filter } from "rxjs/operators";

@Component({
  selector: "inline-edit",
  templateUrl: "./inline-edit.component.html",
  styleUrls: ["./inline-edit.component.scss"],
})
export class InlineEditComponent implements OnInit {
  @Input()
  get value(): string {
    return this._value;
  }
  set value(x: string) {
    this.nombreMotel = this._value = x;
  }
  private _value = "";

  /** Form model for the input. */
  nombreMotel = "";

  constructor(@Optional() @Host() public popover: SatPopover) {}

  ngOnInit() {
    // subscribe to cancellations and reset form value
    console.log(this.value);
    if (this.popover) {
      this.popover.closed
        .pipe(filter(val => val == null))
        .subscribe(() => (this.nombreMotel = this.value || ""));
    }
  }

  onSubmit() {
    if (this.popover) {
      this.popover.close(this.nombreMotel);
    }
  }

  onCancel() {
    if (this.popover) {
      this.popover.close();
    }
  }
}
