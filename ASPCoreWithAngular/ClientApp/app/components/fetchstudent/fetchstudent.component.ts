import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/stdservice.service'

@Component({
    selector: 'fetchStudent',
    templateUrl: './fetchstudent.component.html'
})

export class FetchStudentComponent {
    public stdList: StudentData[];

    constructor(public http: Http, private _router: Router, private _StudentService: StudentService) {
        this.getStudents();
    }

    getStudents() {
        this._StudentService.getStudents().subscribe(
            data => this.stdList = data
        )
    }

    delete(studentID) {
        var ans = confirm("Do you want to delete student with Id: " + studentID);
        if (ans) {
            this._StudentService.deleteStudent(studentID).subscribe((data) => {
                this.getStudents();
            }, error => console.error(error)) 
        }
    }
}

interface StudentData {
    id: number;
    name: string;
    gender: string;
    department: string;
    city: string;
}