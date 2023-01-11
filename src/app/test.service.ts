import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Acquirente} from 'src/app/home/acquirente.module';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {
  acquirente: Acquirente[] = [];

  constructor(private http: HttpClient, public credential){}

  Get(){
    this.http
      .get("https://localhost:7119/api/Acquirentes")
      .pipe(map((response: Acquirente[] ) => {
        return response
      }))
      .subscribe(resp => {
        this.acquirente = resp
      })
  }

}
