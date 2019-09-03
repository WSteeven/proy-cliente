import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';
import { Comment } from '../models/comment';

@Injectable()
export class CommentService {
    public url: string;

    constructor(private _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    addComment(token, comment): Observable<any> {
        const params = JSON.stringify(comment);
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.post(this.url + 'comment', params, { headers });
    }

    /*
    getPublications(token, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url + 'publications/' + page, { headers });
    }

    getPublicationsUser(token, user_id, page = 1): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.get(this.url + 'publications-user/' + user_id + '/' + page, { headers });
    }

    deletePublication(token, id): Observable<any> {
        const headers = new HttpHeaders().set('Content-Type', 'application/json')
            .set('Authorization', token);

        return this._http.delete(this.url + 'publication/' + id, { headers });
    }*/
}
