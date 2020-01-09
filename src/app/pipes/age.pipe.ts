import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "age"
})
// Канал для получения возраста студента из его даты рождения
export class AgePipe implements PipeTransform {
    transform(birthday: Date): number {
        if (birthday == null) {
            return 0;
        }
        birthday = new Date(birthday);
        const now: Date = new Date();
        const age: number = (now.getTime() - birthday.getTime()) / (24 * 3600 * 365.25 * 1000);
        return Math.floor(age);
    }
}
