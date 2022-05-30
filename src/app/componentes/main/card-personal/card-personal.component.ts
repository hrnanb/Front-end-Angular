import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PersonaService } from '../../../servicios/persona.service';
import { Persona } from 'src/app/models/persona';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-card-personal',
  templateUrl: './card-personal.component.html',
  styleUrls: ['./card-personal.component.css']
})
export class CardPersonalComponent implements OnInit {

  @Input() isLogged: any;

  public editPersona: Persona | undefined;
  public persona: Persona | undefined;




  constructor(private PersonaService: PersonaService) { }

  ngOnInit(): void {
    this.getPersona();

  }
  public getPersona(): void {
    this.PersonaService.getPersona().subscribe({
      next: (response: Persona) => {
        this.persona = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }

  public onOpenModal(mode: String, persona?: Persona): void {

    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('date-toggle', 'modal');
    if (mode == 'edit') {
      this.editPersona = persona;
      button.setAttribute('data-bs-target', '#editSobreMi')
    }
    container?.appendChild
    button.click();
  }

  public onUpdatePersona(persona: Persona) {
    this.editPersona = persona;
    document.getElementById('edit-sobre-mi')?.click();
    this.PersonaService.updatePersona(persona).subscribe({

      next: (response: Persona) => {
        console.log(response);
        this.getPersona();
        console.log(persona);

      },
      error: (error: HttpErrorResponse) => {
        this.getPersona();
        console.log(error.message);
      }
    })
  }



}
