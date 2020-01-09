import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, RouterOutlet, Routes } from "@angular/router";
import { PopupComponent } from "../popup/popup.component";
import { AppRoutingModule } from "./app-routing.module";
import { routing } from "./app.routing";
import { OnHoverDirective } from "./directives/onhover.directive";
import { SortDirective } from "./directives/sort.directive";
import { FormComponent } from "./form/form.component";
import { EditGuard } from "./guards/edit.guard";
import { ExitGuard } from "./guards/exit.guard";
import { MainComponent } from "./main/app.component";
import { NotFoundComponent } from "./NotFound/notfound.component";
import { AgePipe } from "./pipes/age.pipe";
import { AppComponent } from "./routeroutlet";

@NgModule({
  declarations: [
    AppComponent,
    PopupComponent,
    FormComponent,
    OnHoverDirective,
    SortDirective,
    AgePipe,
    NotFoundComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: "serverApp" }),
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    routing,
  ],
  exports: [AppComponent],
  providers: [EditGuard, ExitGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
