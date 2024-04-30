import { Component } from '@angular/core';
import { Tarea } from './tarea';
import { AppService } from './app.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'challenge1';

  tareas:any;
  titulo:string = '';
  minutos:number = 0;
  selectAll:boolean=false;
  tareasElegidas:any=[];
  ascending:boolean=false;

  constructor(
    public service: AppService,
  ) { }

  ngOnInit() {
    this.obtenerTareas();
  }

  async obtenerTareas() {
    this.tareas = await this.service.obtenerTareas();
  }

  handleSubmit(data:NgForm){
    //console.log(data.form.controls["minutos"].value);
    this.tareas.push({
      titulo: data.form.controls["titulo"].value,
      minutos: data.form.controls["minutos"].value
    })
  }

  check(e:any, tarea:Tarea){    
    if(e.target.checked){
      this.tareasElegidas.push(tarea);
    }else{
      console.log(this.tareas.indexOf(tarea));
      this.tareasElegidas.splice(this.tareasElegidas.indexOf(tarea), 1);
    }    
  }

  deleteSelected(){    
    for (let i = 0; i < this.tareasElegidas.length; i++) {
      const element = this.tareasElegidas[i];
      this.tareas.splice(this.tareas.indexOf(element),1);      
    }
    this.tareasElegidas = [];
  }

  sorted(type:number){
    console.log(this.ascending);
    if(type==1){
      if(this.ascending){
        this.tareas.sort(function(a:any, b:any) {
          return a.titulo.localeCompare(b.titulo);
        });
      }else{
        this.tareas.sort(function(a:any, b:any) {
          return b.titulo.localeCompare(a.titulo);
       });
      }      
    }
    if(type==2){
      if(this.ascending){
        this.tareas.sort(function(a:any, b:any) {
          return a.minutos-b.minutos;
        });
      }else{
        this.tareas.sort(function(a:any, b:any) {
          return b.minutos-a.minutos;
        });
      }
      
    }
    this.ascending=!this.ascending;
  }

  markItem(item:Tarea){
    this.tareas[this.tareas.indexOf(item)].important = true;
  }

  randomSort(){
    this.tareas.sort(() => Math.random() - 0.5);
  }
}





