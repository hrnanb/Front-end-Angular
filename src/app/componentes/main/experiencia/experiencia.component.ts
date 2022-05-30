import { Component, Input, OnInit } from '@angular/core';
import { Experiencia } from 'src/app/models/experiencia';
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { RestService } from '../../../servicios/rest.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {



  @Input()isLogged:any;


  public experiencia: Experiencia[] = [];
  public editExperiencia: Experiencia | undefined;
  public deleteExperiencia: Experiencia | undefined;

  apiUrl = environment.apiBaseUrl;


  public previsualizacion: string;
  public archivos: any = []
  public loading: boolean
  imgNombre: string = '';
  imgUrl = this.apiUrl + '/images/';



  constructor(private experienciaService: ExperienciaService,private rest: RestService) { }

  ngOnInit(): void {
    this.getExperiencia();
  }



  public getExperiencia(): void {
    this.experienciaService.getExperiencia().subscribe({
      next: (response: Experiencia[]) => {
        this.experiencia = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }


  public onOpenModal(mode: String, experiencia?: Experiencia): void {

    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('date-toggle', 'modal');
    if (mode === 'addExp') {
      button.setAttribute(' data-bs-target', '#addExperienciaModal');

    } else if (mode === 'deleteExp') {
      this.deleteExperiencia = experiencia;
    } else if (mode === 'editExp') {
      this.editExperiencia = experiencia;
      button.setAttribute('data-bs-target', '#editExperienciaModal')
    }
    container?.appendChild
    button.click();
  }
  public onAddExperiencia(addForm: NgForm) {
    document.getElementById('add-experiencia-fom')?.click();
    this.experienciaService.addExperiencia(addForm.value).subscribe({
      next: (response: Experiencia) => {
        console.log(response);
        this.getExperiencia();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.getExperiencia();
        addForm.reset();
      }
    })
  }

  public onUpdateExperiencia(experiencia: Experiencia) {
    this.editExperiencia = experiencia;
    document.getElementById('add-experiencia-fom')?.click();
    this.experienciaService.updateExperiencia(experiencia).subscribe({

      next: (response: Experiencia) => {
        console.log(response);
        this.getExperiencia();
        console.log(experiencia);

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.getExperiencia();
      }
    })
  }

  public onDeleteExperiencia(idExp: number, experiencia: Experiencia): void {
    this.experienciaService.deleteExperiencia(idExp).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getExperiencia();

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.getExperiencia();
      }
    })
  }

  public click(idExp: number, deleteEducacion: Experiencia): void {

  }



  // ************** IMAGEN**********///



  extraerBase64 = async ($event: any) => new Promise((resolve, reject): any => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      ///const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
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


  // **************SUBIR IMAGEN**********///


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
