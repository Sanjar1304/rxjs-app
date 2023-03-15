import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError, map, shareReplay, tap } from 'rxjs/operators'
import { LoadingService } from "../loading/loading.service";
import { MessageService } from "../messages/message.service";
import { Course, sortCoursesBySeqNo } from "../model/course";



@Injectable({
    providedIn: 'root'
})
export class CoursesStore{


    private subject = new BehaviorSubject<Course[]>([]);
    courses$: Observable<Course[]> = this.subject.asObservable()
    

    constructor(
        private http: HttpClient,
        private loading: LoadingService,
        private messages: MessageService){

            this.loadAllCourses();
        }

    

    /* ================ GET ALL COURSES ================ */
    private loadAllCourses(){
        const loadCourses$ = this.http.get<Course[]>('/api/courses').pipe(
            map(response => response['payload']),
            catchError(err => {
               const message = 'Courses are not loaded';
               this.messages.showErrors(message);
               console.log(message, err);
               return throwError(err)
            }),
            tap(courses => this.subject.next(courses)),
            shareReplay()
        );
        
        this.loading.showLoaderUntilCompleted(loadCourses$).subscribe()
    }



    /* ================ SAVE COURSE ================ */
    saveCourse(courseId: string, changes: Partial<Course>): Observable<any>{
        const courses = this.subject.getValue();
        const index = courses.findIndex(course => course.id == courseId);

        const newCourse: Course = {
            ...courses[index],
            ...changes
        }

        const newCoursesArray: Course[] = courses.slice(0);
        newCoursesArray[index] = newCourse;

        this.subject.next(newCoursesArray);
 
        return this.http.put(`/api/courses/${courseId}`, changes)
        .pipe(
            catchError(err => {
                const message = 'Could not save course';
                this.messages.showErrors(message);
                console.log(message, err);
                return throwError(err);
            }),
            shareReplay()
        )
    }





    /* ================ FILTER BY CATEGORY COURSES ================ */
    filterByCategory(category: string): Observable<Course[]> {
        return this.courses$.pipe(
                map(courses => courses.filter(course => course.category == category).sort(sortCoursesBySeqNo))
            )
    }



    


}