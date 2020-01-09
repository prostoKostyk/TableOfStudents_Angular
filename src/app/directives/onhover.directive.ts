import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
  selector: "[onHover]"
})
export class OnHoverDirective {
  // директива для смещения и изменения цвета рамки кнопок при наведении на них
  @Input("onHover") onHoverColor;
  constructor(private el: ElementRef) { }
  @HostListener("mouseenter") onMouseEnter(): void {
    this.setTop(5);
    this.setBorderStyle(this.onHoverColor, "0px 0px 3px 0px #c0c0c0");
  }
  @HostListener("mouseleave") onMouseLeave(): void {
    this.setTop(0);
    this.setBorderStyle("grey", "");
  }

  setTop(size: number | string): void {
    this.el.nativeElement.style.marginBottom = size + "px";
  }
  setBorderStyle(color: string, shadow: string): void {
    this.el.nativeElement.style.borderColor = color;
    this.el.nativeElement.style.boxShadow = shadow;
  }
}
