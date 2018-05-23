import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import { CourseService } from '../../Services/crsservice.service';

@Component({
    selector: 'createcourse',
    templateUrl: './Addcourse.component.html'
})

export class createcourse implements OnInit {
    courseForm: FormGroup;
    title: string = "Create";
    id: number;
    errorMessage: any;

    constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
        private _courseService: CourseService, private _router: Router) {
        if (this._avRoute.snapshot.params["id"]) {
            this.id = this._avRoute.snapshot.params["id"];
        }

        this.courseForm = this._fb.group({
            id: 0,
            name: ['', [Validators.required]],
            gender: ['', [Validators.required]],
            department: ['', [Validators.required]],
            city: ['', [Validators.required]]
        })
    }

    ngOnInit() {

        if (this.id > 0) {
            this.title = "Edit";
            this._courseService.getCourseById(this.id)
                .subscribe(resp => this.courseForm.setValue(resp)
                    , error => this.errorMessage = error);
        }

       
    }

    save() {

        if (!this.courseForm.valid) {
            return;
        }

        if (this.title == "Create") {
            this._courseService.saveCourse(this.courseForm.value)
                .subscribe((data) => {
                    this._router.navigate(['/create-course']);
                }, error => this.errorMessage = error)
        }
        
    }

    cancel() {
        this._router.navigate(['/create-course']);
    }

    get name() { return this.courseForm.get('name'); }
    get gender() { return this.courseForm.get('gender'); }
    get department() { return this.courseForm.get('department'); }
    get city() { return this.courseForm.get('city'); }
}