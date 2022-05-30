import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ProyectosService } from 'src/app/servicios/proyectos.service';
import { Proyectos } from 'src/app/models/proyectos';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {

@Input()isLogged:any;


public proyectos: Proyectos[] = [];
public editProyectos: Proyectos | undefined;
public deleteProyectos: Proyectos | undefined;


  constructor(private proyectosService : ProyectosService) { }

  ngOnInit(): void {
    this.getProyectos();
  }



  public getProyectos(): void {
    this.proyectosService.getProyectos().subscribe({
      next: (response: Proyectos[]) => {
        this.proyectos = response;


      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }


  public onOpenModal(mode: String, proyectos?: Proyectos): void {

    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('date-toggle', 'modal');
    if (mode === 'addProyectos') {
      button.setAttribute(' data-bs-target', '#addProyectosModal');
    } else if (mode === 'deleteProyectos') {
      this.deleteProyectos = proyectos;
    } else if (mode === 'editProyectos') {
      this.editProyectos = proyectos;
      button.setAttribute('data-bs-target', '#addProyectosModal')
    }
    container?.appendChild
    button.click();
  }


  public onAddProyectos(addForm: NgForm) {
    document.getElementById('add-fom')?.click();
    this.proyectosService.addProyectos(addForm.value).subscribe({
      next: (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
        addForm.reset();

      },
      error: (error: HttpErrorResponse) => {
        this.getProyectos();
        console.log(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateProyectos(proyectos: Proyectos) {
    this.editProyectos = proyectos;
    document.getElementById('add-fom')?.click();
    this.proyectosService.updateProyectos(proyectos).subscribe({

      next: (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
        console.log(proyectos);
        console.log(this.editProyectos)

      },
      error: (error: HttpErrorResponse) => {
        this.getProyectos();
        console.log(error.message);
      }
    })
  }

  public onDeleteProyectos(idProyecto: number, proyectos: Proyectos): void {
    this.proyectosService.deleteProyectos(idProyecto).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getProyectos();

      },
      error: (error: HttpErrorResponse) => {
        this.getProyectos();
        console.log(error.message);
      }
    })
  }

  public click(idProyecto: number, deleteProyectos: Proyectos): void {

  }






}
