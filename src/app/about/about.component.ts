import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  team = ["Antony (project menager)","Luigi","Eloise","Lorenzo","Matteo"];
  value;

  add(){
    if(this.value != ""){
      const capitalize = this.value.charAt(0).toUpperCase() + this.value.slice(1);
      this.team.push(capitalize);
      this.value = "";
    }
  }
}
