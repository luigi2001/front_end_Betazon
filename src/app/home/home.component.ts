import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { TestService } from '../test.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  name = "";
  id = "";

  constructor(public test: TestService) {}

  ngOnInit(): void {
    this.test.Get()
  }

  /*constructor(private http: HttpClient){}
  Post(){
    this.http
    .post("https://localhost:7119/api/Acquirentes",{
      "name":this.name
    })
    .subscribe(resp =>{
    })
    this.name = "";
  }

  Put(){
    this.http
    .put("https://localhost:7119/api/Acquirentes/"+this.id,{
      "id":this.id,
      "name":this.name
    })
    .subscribe(resp =>{
    })
    this.id = "";
    this.name = "";
  }

  Delete(){
    this.http
    .delete("https://localhost:7119/api/Acquirentes/"+this.id)
    .subscribe(resp =>{
    })
    this.id = "";
  }*/

}
