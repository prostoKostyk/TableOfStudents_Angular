import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Item } from "./users";
@Injectable()
export class HttpService {

    constructor(private http: HttpClient) { }

    // tslint:disable-next-line:typedef
    getUsers(): Observable<Item[]> {
        return this.http.get("assets/users.json").pipe(map(data => {
            const usersList = data["userList"];
            // tslint:disable-next-line:no-any
            return usersList.map(function(user: any): object {
                return {firstName: user.firstName, secondName: user.secondName, lastName: user.lastName, date: user.date, mark: user.mark, visible: user.visible, modalVisible: user.modalVisible, light: user.light};
              });
        }));
    }
    public getUserbyId(userId: string): Observable<Item> {
        return this.http.get<Item>("edit/" + userId);
    }
    }
