import { Component} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Customer} from 'src/app/customer/customer.model';
import { map} from 'rxjs';
import { Vendite } from './vendite.model';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent{
  customer: Customer[] = []
  custumer2: [] = []
  vendite: Vendite[] = []
  nome = "";
  cognome = "";
  firstName = this.custumer2["firstName"];
  lastName = this.custumer2["lastName"];
  email = this.custumer2["emailAddress"];
  phone = this.custumer2["phone"];
  verify = false
  verifyorder = false
  verifyCredential = false
  verifyLogout = false
  notStories = false
  cust = false
  public httpHeaderOptions = {headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + this.leggiStorange()
  })}

  leggiStorange(){
    if(localStorage.getItem('token') == null || localStorage.getItem('token') == ""){
      return ""
    }else{
      return localStorage.getItem('token')
    }
  }

  ricevi(value){

    localStorage.setItem('token', btoa(value));

    this.httpHeaderOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + localStorage.getItem('token')
      })
    }

    this.http
      .get("https://localhost:7043/api/Customers",this.httpHeaderOptions)
      .pipe()
      .subscribe( success => {
        alert("login success")
        this.verifyCredential = false
        this.verifyLogout = true
      },
      (err: HttpErrorResponse) => {
        if(err.status == 401){
          alert("login errato")
          this.verifyCredential = true
          this.verifyLogout = false
        }
      }
      )
  }

  logout(){
    this.httpHeaderOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa("")
      })
    }
    localStorage.clear()
    this.verifyLogout = false
    this.verify = false
    this.notStories = false
    this.cust = false
    this.verifyorder = false
  }

  constructor(private http: HttpClient){}

  Cerca(){
    this.http
      .get("https://localhost:7043/api/Customers/"+ this.nome+ "/" + this.cognome,this.httpHeaderOptions)
      .pipe(map((response: Customer[] ) => {
        return response
      }))
      .subscribe(resp => {
        this.verifyLogout = true
        this.customer = resp
        this.notStories = false
        this.cust = true
        this.verifyorder = false
      },
      (err: HttpErrorResponse) => {
        if(err.status == 401){
          alert("devi eseguire il login")
          this.verifyCredential = true
        }else if(err.status == 404){
          alert("inserisci nome e cognome del customer")
        }/*else if(err.status == 500){
          this.logout()
          alert("devi eseguire il login")
        }*/
      }
      )
  }

  Mostra(id){
    this.http
      .get("https://localhost:7043/api/SalesOrderHeaders/" + id,this.httpHeaderOptions)
      .pipe(map((response: Vendite[] ) => {
        return response
      }))
      .subscribe(resp => {
        this.vendite = resp
        if(this.vendite.length == 0){
          this.notStories = true
          this.verify = false
          this.verifyorder = true
        }
      })
  }

  Delete(id){
    this.http
    .delete("https://localhost:7043/api/Customers/"+ id,this.httpHeaderOptions)
    .subscribe(resp =>{
      alert("customer " + id + " eliminato con successo")
      this.notStories = false
      this.verify = false
      this.cust = false
      this.verifyorder = false
    })
  }

  Get(id){
    this.verify = true
    this.http
      .get("https://localhost:7043/api/Customers/"+ id,this.httpHeaderOptions)
      .pipe(map((response: [] ) => {
        return response
      }))
      .subscribe(resp => {
        this.custumer2 = resp
        console.log(this.custumer2)
        this.notStories = false
        this.verifyorder = false
      }) 
  }

  Put(){
    this.http
    .put("https://localhost:7043/api/Customers/"+this.custumer2["customerId"],{
            "CustomerId": this.custumer2["customerId"],
            "NameStyle": this.custumer2["nameStyle"],
            "FirstName" : this.firstName,
            "LastName": this.lastName,
            "EmailAddress" : this.email,
            "Phone": this.phone,
            "PasswordHash" : this.custumer2["passwordHash"],
            "PasswordSalt" : this.custumer2["passwordSalt"],
            "Rowguid": this.custumer2["rowguid"],
            "ModifiedDate": new Date
    },this.httpHeaderOptions)
    .subscribe(resp =>{
      alert("modifica avvenuta con successo")
      this.verify = false
      this.verifyorder = false
    },(err: HttpErrorResponse) => {
      if(err.status == 400){
        alert("Attenzione!!Rinserisci tutti i dati, anche quelli che non vuoi modificare")
      }else{
        alert("errore: " + err.status)
      }
    })
  }

}

