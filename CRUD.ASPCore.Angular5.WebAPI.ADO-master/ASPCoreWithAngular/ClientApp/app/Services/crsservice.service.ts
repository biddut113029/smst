import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CourseService {
    myAppUrl: string = "";

    constructor(private _http: Http, @Inject('BASE_URL') baseUrl: string) {
        this.myAppUrl = baseUrl;
    }

 
    getCourseById(id: number) {
        return this._http.get(this.myAppUrl + "api/Course/Details/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    saveCourse(course) {
        return this._http.post(this.myAppUrl + 'api/Course/Create', course)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}