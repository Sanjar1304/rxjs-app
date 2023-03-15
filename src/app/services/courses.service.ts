import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map, shareReplay } from 'rxjs/operators'
import { Course } from "../model/course";


@Injectable({
    providedIn: 'root'
})
export class CoursesService{

    beginner: Course[] = []

    constructor(){}

}