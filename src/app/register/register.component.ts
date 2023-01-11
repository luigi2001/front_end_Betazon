import { Component } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  firstName = "";
  lastName = "";
  mail = "";
  pass = "";
  phone = "";

  constructor(private http: HttpClient){}

  register(){
    if(this.firstName != "" && this.lastName != "" && this.mail != "" && this.pass != "" && this.phone != ""){
      this.http
          .post("https://localhost:7043/api/Customers",{
            "id": 0,
            "LastName": this.lastName,
            "FirstName" : this.firstName,
            "mailAddress" : this.mail,
            "Phone": this.phone,
            "Password" : this.pass,
            "ModifiedDate": new Date
          })
          .subscribe(resp =>{
            alert("Registrazione avvenuta con successo")
          },(err: HttpErrorResponse) => {
            alert("errore " + err.status)
          })
    }else{
      alert("devi compilare tutti i dati correttamente")
    }       
  }
}
