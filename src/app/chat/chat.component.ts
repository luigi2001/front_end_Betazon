import { Component, OnInit } from '@angular/core';
import {HubConnection,HubConnectionBuilder,LogLevel} from '@microsoft/signalr';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  Regards: string;
  markets: string[] = [];

  private hubConnectionBuilder!: HubConnection

  constructor() { }

  async ngOnInit() {
    this.hubConnectionBuilder = new HubConnectionBuilder()
    .withUrl('https://localhost:7043/market')
    .configureLogging(LogLevel.Information)
    .build();
  this.hubConnectionBuilder
    .start()
    .then(() => console.log('Inizializzazione Connessione ...'))
    .catch(err => console.log('Errore durante connessione Server Hub SignalR'));

  this.hubConnectionBuilder.on('SendMarketingToUser', (data: string) => {
    this.markets.push(data);
    console.log(this.markets)
  });
  }

}
