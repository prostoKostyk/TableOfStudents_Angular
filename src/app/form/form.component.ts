import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { Item } from "src/app/users";
import { birthdayValidatorC } from "src/validators/birthday.validator";
import { match } from "src/validators/match.validator";
import { ComponentCanDeactivate } from "../guards/exit.guard";
@Component({
  selector: "form-comp",
  templateUrl: "./form.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ["./form.component.css"]
})
export class FormComponent implements OnChanges, OnInit, ComponentCanDeactivate {
  @Input() changeMode: boolean;
  userId: string; // id изменяемого студента
  head: string; // надпись в заголовке страницы
  recivedItems; // объект, в который записываются полученные из app.component студенты
  items: Item[] = []; // массив студентов, в который записываются студенты из полученного объекта из app.component
  buttonValue: string; // надпись на кнопке (добавить или изменить)
  saved: boolean = false; // были ли сохранены данные перед выходом из формы
  myForm = new FormGroup({
    FIOForm: new FormGroup({
      firstNameForm: new FormControl("", [Validators.required]),
      secondNameForm: new FormControl("", [Validators.required]),
      lastNameForm: new FormControl("", [Validators.required])
    }, match("firstNameForm", "secondNameForm", "lastNameForm")),
    birthday: new FormControl("", [Validators.required, birthdayValidatorC]),
    markForm: new FormControl("", Validators.required)
  });
  constructor(public activeRoute: ActivatedRoute, private router: Router) {
    this.recivedItems = history.state;
    let i = 0;
    while (this.recivedItems[i]) {
      this.items[i] = this.recivedItems[i];
      i++;
    }
    if (activeRoute.snapshot.url[0].path === "add") {
      this.buttonValue = "Добавить";
      this.head = "Добавление нового студента";
      this.changeMode = false;
    }
    if (activeRoute.snapshot.url[0].path === "edit") {
      this.buttonValue = "Изменить";
      this.head = "Изменение студента";
      this.changeMode = true;
      this.userId = activeRoute.snapshot.params["id"];
    }
  }

  @Output() onChanged = new EventEmitter<object>();
  change(firstName: string, lastName: string, secondName: string, date: Date, mark: number): void {
    const newStudent = { firstName: firstName, lastName: lastName, secondName: secondName, date: date, mark: mark, visible: true, modalVisible: false, light: false };
    if (this.changeMode) {
      this.items[this.userId] = (newStudent);
    } else {
      this.items.push(newStudent);
    }
    const newItems = this.items;
    this.router.navigateByUrl("/", { state: newItems });
    this.saved = true;
  }
  closeForm(): void {
    this.router.navigateByUrl("/", { state: this.recivedItems });
  }
  ngOnInit(): void {
    this.fieldForm(+this.userId);
  }

  fieldForm(n: number): void {
    if (this.changeMode) {
      this.myForm.setValue({
        FIOForm: {
          firstNameForm: this.items[n].firstName, secondNameForm: this.items[n].secondName,
          lastNameForm: this.items[n].lastName
        }, birthday: this.yyyymmdd(new Date(this.items[n].date)), markForm: this.items[n].mark
      });
    } else {
      this.myForm.setValue({
        FIOForm: {
          firstNameForm: "", secondNameForm: "", lastNameForm: ""
        }, birthday: "", markForm: ""
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  canDeactivate(): boolean | Observable<boolean> {
    if (!this.saved) {
      return confirm("Несохраненные данные будут удалены, вы уверены, что хотите покинуть страницу?");
    }
      return true;
  }
  yyyymmdd(date: Date): string {
    date = new Date(date);
    const y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    (d.length === 1) && (d = "0" + d);
    (m.length === 1) && (m = "0" + m);
    const ddmmyyyy: string = y + "-" + m + "-" + d;
    return ddmmyyyy;
  }
}

