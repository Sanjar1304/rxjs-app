
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from 'rxjs/operators';
import { Lesson } from "../model/lesson";


@Injectable({
    providedIn: 'root'
})
export class CoursesService{



    constructor(private http: HttpClient){}


    searchLessons(search: string): Observable<Lesson[]>{
        return this.http.get<Lesson[]>('/api/lessons', {
            params: {
                filter: search,
                pageSize: "100"
            }
        })
        .pipe(
            map(res => res['payload']),
            shareReplay()
        )
    }




}