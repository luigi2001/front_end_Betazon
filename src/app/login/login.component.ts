import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Acquirente } from '../home/acquirente.module';
import { TestService } from '../test.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  mail = "";
  pass = "";
  credential = ""

  @Output() RiceviCredenziali = new EventEmitter<string>()

  constructor(){}
  ngOnInit(): void {}

  MandaCredenziali(){
    this.credential = this.mail + ":" + this.pass
    this.RiceviCredenziali.emit(this.credential)
  }

}
