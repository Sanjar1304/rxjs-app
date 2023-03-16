import {AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import {Course} from "../model/course";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';
import { CoursesStore } from '../services/courses.store';


@Component({
    selector: 'course-dialog',
    templateUrl: './course-dialog.component.html',
    styleUrls: ['./course-dialog.component.css'],
})
export class CourseDialogComponent implements AfterViewInit {

    form: FormGroup;

    course:Course;

    constructor(
        private fb: FormBuilder,
        private dialogRef: MatDialogRef<CourseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) course:Course,
        private coursesStore: CoursesStore) {

        this.course = course;
        this.validationModal()
    }


    ngAfterViewInit() {}


    // ================ VALIDATING DIALOG MODAL ==============//
    validationModal(){
        this.form = this.fb.group({
            description: [this.course.description, Validators.required],
            category: [this.course.category, Validators.required],
            releasedAt: [moment(), Validators.required],
            longDescription: [this.course.longDescription,Validators.required]
        });
    }



    // ================ SAVING DATA AND SUBSCRIBING IT IN THE MODAL ==============//
    save() {
        const changes = this.form.value;
        this.coursesStore.saveCourse(this.course.id, changes).subscribe() 
        this.dialogRef.close(changes);
    }



    // ================ CLOSING DIALOG MODAL ==============//
    close() {
        this.dialogRef.close();
    }



}
