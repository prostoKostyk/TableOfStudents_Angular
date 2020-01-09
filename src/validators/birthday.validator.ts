import { AbstractControl } from "@angular/forms";

export function birthdayValidatorC(date: AbstractControl): {[s: string]: boolean} {
        const birthday = new Date(date.value);
        const now: Date = new Date();
        const age: number = (now.getTime() - birthday.getTime()) / (24 * 3600 * 365.25 * 1000);
        if (age < 10) {
            return ({birthdayValidator: true});
        }
        return (null);
}

