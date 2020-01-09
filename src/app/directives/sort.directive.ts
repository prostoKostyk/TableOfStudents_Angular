import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer } from "@angular/core";

@Directive({
  selector: "[sort]"
})
export class SortDirective {
  // директива для добавления картинки со стрелкой (вниз/вверх) при на нажатии на кнопку сортировки
  @Input("sort") sortName;
  sortsDirections: object = { firstName: true, secondName: true, lastName: true, birthday: true, mark: true };
  constructor(private el: ElementRef, private renderer: Renderer) { }
  @HostListener("click") onClick(): void {
    if (!this.sortsDirections[this.sortName]) {
    this.el.nativeElement.style.backgroundImage = "url(http://i.piccy.info/i9/3efbf8c11e3c0c7e446754834406936a/1577030638/342/1353795/up.png)";
    this.el.nativeElement.style.backgroundRepeat = "no-repeat";
   } else {
      this.el.nativeElement.style.backgroundImage = "url(http://i.piccy.info/i9/ed20c2d0a121ac83dbe8f4dc5e457d67/1577030665/343/1353795/down.png)";
      this.el.nativeElement.style.backgroundRepeat = "no-repeat";
  }
    this.sortsDirections[this.sortName] = !this.sortsDirections[this.sortName];
}
}
