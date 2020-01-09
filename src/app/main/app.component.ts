import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpService } from "../http.service";
import { Item } from "../users";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  providers: [HttpService],
  styleUrls: ["./app.component.css"]
})
export class MainComponent implements OnInit {
  newItems;
  addVisible: boolean = false; // видимость блока добавления студента
  changeMode: boolean = false;
  buttonValue: string = "Добавить"; // Надпись на кнопке добавления/изменения
  numberChangingItem: number; // номер изменяемого элемента
  sortsDirections: object = { firstName: true, secondName: true, lastName: true, birthday: true, mark: true };
  items: Item[] = [];

  constructor(private httpService: HttpService, private router: Router) {
    this.newItems = history.state;
    let i = 0;
    while (this.newItems[i]) {
      this.items.push(this.newItems[i]);
      i++;
    }
  }
  ngOnInit(): void {
    if (!this.newItems[0]) {
    this.httpService.getUsers().subscribe(data => this.items = data);
    }
  }
  edit (userId: number, mark: number): void {
    this.router.navigateByUrl("edit/" + userId + "/" + mark, { state: this.items });
  }
  add (userId: number): void {
    this.router.navigateByUrl("add", { state: this.items });
  }

  onChanged(obj: { firstName: string, lastName: string, secondName: string, date: Date, mark: number }): void {
    this.addVisible = !this.addVisible;
  }
  changeNumber(n: number): void {
    this.buttonValue = "Изменить";
    this.changeMode = true;
    if (this.numberChangingItem !== n) {
      this.numberChangingItem = n;
      this.addVisible = true;
    } else {
      this.addVisible = !this.addVisible;
    }
  }

  // Удаление элемента
  deleteItem(n: number): void {
    this.items.splice(n, 1);
  }

  // Поиск элемента
  findItem(toFind: string): void {
    toFind = toFind.trim(); // удаление пробелов в конце и начале строки
    this.items.forEach(element => element.light = false);
    this.items.forEach(element => {
      if (element.firstName === toFind || element.secondName === toFind || element.lastName === toFind) {
        element.light = true;
      }
    });
  }
  // Фильтр
  filter(markMin: number, markMax: number, dateMin: Date, dateMax: Date): void {
    dateMin = new Date(dateMin);
    dateMax = new Date(dateMax);
    this.items.forEach(element => {
      const d: Date = element.date;
      const m: number = element.mark;
      if (m < markMin || m > markMax || d < dateMin || d > dateMax) {
        element.visible = false;
      } else if (true) {
        element.visible = true;
      }
    });
  }
  goAdd(buttonValue: string): void {
    this.router.navigate(["/add"], {
      queryParams: {
          "buttonValue": buttonValue
      }
  });
  }
  // Сортировки
  sortByFirstName(): void {
    if (this.sortsDirections["firstName"]) {
      this.items.sort((a, b) => a.firstName > b.firstName ? 1 : -1);
    } else {
      this.items.sort((a, b) => a.firstName > b.firstName ? -1 : 1);
    }
    this.sortsDirections["firstName"] = !this.sortsDirections["firstName"];
  }
  sortBySecondName(): void {
    if (this.sortsDirections["secondName"]) {
    this.items.sort((a, b) => a.secondName > b.secondName ? 1 : -1);
   } else {
      this.items.sort((a, b) => a.secondName > b.secondName ? -1 : 1);
    }
    this.sortsDirections["secondName"] = !this.sortsDirections["secondName"];
  }
  sortByLastName(): void {
  if (this.sortsDirections["lastName"]) {
    this.items.sort((a, b) => a.lastName > b.lastName ? 1 : -1);
  } else {
    this.items.sort((a, b) => a.lastName > b.lastName ? -1 : 1);
  }
  this.sortsDirections["lastName"] = !this.sortsDirections["lastName"];
}
  sortByBirthday(): void {
    if (this.sortsDirections["Birthday"]) {
    this.items.sort((a, b) => a.date > b.date ? 1 : -1);
  } else {
    this.items.sort((a, b) => a.date > b.date ? -1 : 1);
  }
  this.sortsDirections["Birthday"] = !this.sortsDirections["Birthday"];
}
  sortByMark(): void {
    if (this.sortsDirections["mark"]) {
    this.items.sort((a, b) => a.mark > b.mark ? -1 : 1);
  } else {
    this.items.sort((a, b) => a.mark > b.mark ? 1 : -1);
  }
  this.sortsDirections["mark"] = !this.sortsDirections["mark"];
}
  // преобразование дат в формат дд-мм-гггг
  yyyymmdd(date: Date): string {
    date = new Date(date);
    const y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    (d.length === 1) && (d = "0" + d);
    (m.length === 1) && (m = "0" + m);
    const ddmmyyyy: string = d + "-" + m + "-" + y;
    return ddmmyyyy;
  }
}
