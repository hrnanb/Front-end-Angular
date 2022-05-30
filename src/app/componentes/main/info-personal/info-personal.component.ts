import { Component, OnInit, Input } from '@angular/core';
import { Persona } from 'src/app/models/persona';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';
import { RestService } from '../../../servicios/rest.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { PersonaService } from '../../../servicios/persona.service';

@Component({
  selector: 'app-info-personal',
  templateUrl: './info-personal.component.html',
  styleUrls: ['./info-personal.component.css']
})
export class InfoPersonalComponent implements OnInit {

  @Input() isLogged: any;

  //Servicio
  apiUrl = environment.apiBaseUrl;


  //Globales / get,put,post
  public persona: Persona | undefined;
  public editPersona: Persona | undefined;
  public deletePersona: Persona | undefined;



  //foto
  public previsualizacion: string;
  public archivos: any = []
  public loading: boolean
  imgNombre: string = '';
  imgUrl = this.apiUrl + '/images/';


  constructor(private PersonaService: PersonaService, private rest: RestService, private sanitizer: DomSanitizer) { }


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
    if (mode === 'add') {
      button.setAttribute(' data-bs-target', '#addPersonaModal');

    } else if (mode === 'delete') {
      this.deletePersona = persona;
    } else if (mode == 'edit') {
      this.editPersona = persona;
      button.setAttribute('data-bs-target', '#editPersonaModal')
    }
    container?.appendChild
    button.click();
  }

  //Agregar
  public onAddPersona(addForm: NgForm) {
    document.getElementById('add-persona-fom')?.click();
    this.PersonaService.addPersona(addForm.value).subscribe({
      next: (response: Persona) => {
        console.log(response);
        this.getPersona();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.getPersona();
        console.log(error.message);
        addForm.reset();
      }
    })
  }


  //Modificar
  public onUpdatePersona(persona: Persona) {
    this.editPersona = persona;
    document.getElementById('add-persona-fom')?.click();
    this.PersonaService.updatePersona(persona).subscribe({
      next: (response: Persona) => {
        this.getPersona();
        console.log(response);
        console.log(persona);
      },
      error: (error: HttpErrorResponse) => {
        this.getPersona();
        console.log(error.message);
      }
    })
    this.getPersona();
  }
  //Eliminar
  public onDeletePersona(idPersona: number, persona: Persona): void {
    this.PersonaService.deletePersona(idPersona).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getPersona();

      },
      error: (error: HttpErrorResponse) => {
        this.getPersona();
        console.log(error.message);
      }
    })
  }

  public click(idPersona: number, deletePersona: Persona): void {

  }




  // ************** IMAGEN**********///


 //Previsualizacion
  extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      //const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e) {
      return null;
    };
  });


  //Captura
  capturarFile(event: any): any {
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;
      console.log(imagen);

    });
    this.archivos.push(archivoCapturado)
    this.imgNombre = archivoCapturado.name;
    console.log(archivoCapturado.name); // el nombre almaceno en la base de datos

  };


 // SUBIR LA IMAGEN


  clearImage(): any {
    this.previsualizacion = '';
    this.archivos = [];
    this.imgNombre = ' ';
  }


  // SUBIR LA IMAGEN
  subirArchivo(): any {
    try {
      this.loading = true;

      const formularioDeDatos = new FormData();
      this.archivos.forEach((e: any) => {
        formularioDeDatos.append('files', e)
      })
      this.rest.post(`https://api-porfolio-hernan.herokuapp.com/images/upload`, formularioDeDatos)
        .subscribe(res => {
          this.loading = false;
          console.log('Respuesta del servidor', res);

        }, () => {
          this.loading = false;
          alert('Error');
        })
    } catch (e) {
      this.loading = false;
      console.log('ERROR', e);

    }
  }

}
