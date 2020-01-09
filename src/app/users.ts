export class Item {
    firstName: string;
    secondName: string;
    lastName: string;
    date: Date;
    mark: number;
    visible: boolean;
    modalVisible: boolean;
    light: boolean;

    constructor(firstName: string, secondName: string, lastName: string, date: Date, mark: number, visible: boolean, modalVisible: boolean, light: boolean) {
      this.firstName = firstName;
      this.secondName = secondName;
      this.lastName = lastName;
      this.date = date;
      this.mark = mark;
      this.visible = visible; // показать/скрыть студента
      this.modalVisible = modalVisible; // показать/скрыть окно удаления студента
      this.light = light; // подстветка студента жёлтым при поиске
    }
  }
