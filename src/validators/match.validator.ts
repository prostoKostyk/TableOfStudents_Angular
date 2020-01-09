import { FormGroup } from "@angular/forms";

export function match(firstName: string, secondName: string, lastName: string ): object {
    return (formGroup: FormGroup) => {
        const firstNameControl = formGroup.controls[firstName];
        const secondNameControl = formGroup.controls[secondName];
        const lastNameControl = formGroup.controls[lastName];
        // Проверка нет ли уже других ошибок
        if (firstNameControl.value === secondNameControl.value && firstNameControl.value) {
            secondNameControl.setErrors({ match: "Фамилия не должна совпадать с именем" });
        }
        if (firstNameControl.value ===  lastNameControl.value && firstNameControl.value) {
            lastNameControl.setErrors({ match: "Отчество не должно совпадать с именем" });
        }
    };
}
