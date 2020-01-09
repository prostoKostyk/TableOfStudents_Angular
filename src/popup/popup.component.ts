import { Component, Input } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: "popup-comp",
    templateUrl: "./popup.component.html",
    styleUrls: ["./popup.component.css"]
})
export class PopupComponent {
  @Input() error: string;
  @Input() usl: string;
}
