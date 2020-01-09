import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./form/form.component";
import { EditGuard } from "./guards/edit.guard";
import { ExitGuard } from "./guards/exit.guard";
import { MainComponent } from "./main/app.component";
import { NotFoundComponent } from "./NotFound/notfound.component";
import { AppComponent } from "./routeroutlet";
const routes: Routes = [
    { path: "", component: MainComponent},
    { path: "add", component: FormComponent },
    { path: "edit/:id/:mark", component: FormComponent, canActivate: [EditGuard], canDeactivate: [ExitGuard] },
    { path: "**", component: NotFoundComponent },
];
export const routing = RouterModule.forRoot(routes);
