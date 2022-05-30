import { Component, Input, OnInit } from '@angular/core';
import { Educacion } from 'src/app/models/educacion';
import { EducacionServiceService } from 'src/app/servicios/educacion-service.service';
import { RestService } from '../../../servicios/rest.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {


  @Input() isLogged: any;

  public educacion: Educacion[] = [];
  public editEducacion: Educacion | undefined;
  public deleteEducacion: Educacion | undefined;

  apiUrl = environment.apiBaseUrl;


  public previsualizacion: string;
  public archivos: any = []
  public loading: boolean
  imgNombre: string = '';
  imgUrl = this.apiUrl + '/images/';




  constructor(private EducacionServiceService: EducacionServiceService, private rest: RestService) { }

  ngOnInit(): void {
    this.getEducacion();
  }

  public getEducacion(): void {
    this.EducacionServiceService.getEducacion().subscribe({
      next: (response: Educacion[]) => {
        this.educacion = response;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }


  public onOpenModal(mode: String, educacion?: Educacion): void {

    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('date-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute(' data-bs-target', '#addEducacionModal');

    } else if (mode === 'delete') {
      this.deleteEducacion = educacion;
    } else if (mode == 'edit') {
      this.editEducacion = educacion;
      button.setAttribute('data-target', '#editEducacionModal')
    }
    container?.appendChild
    button.click();
  }
  public onAddEducacion(addForm: NgForm) {
    document.getElementById('add-educacion-fom')?.click();
    this.EducacionServiceService.addEducacion(addForm.value).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getEducacion();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        this.getEducacion();
        console.log(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateEducacion(educacion: Educacion) {
    this.editEducacion = educacion;
    document.getElementById('add-educacion-fom')?.click();
    this.EducacionServiceService.updateEducacion(educacion).subscribe({

      next: (response: Educacion) => {
        console.log(response);
        this.getEducacion();
        console.log(educacion);

      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message);
        this.getEducacion();
      }
    })
  }

  public onDeleteEducacion(idEdu: number, educacion: Educacion): void {
    this.EducacionServiceService.deleteEducacion(idEdu).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getEducacion();

      },
      error: (error: HttpErrorResponse) => {
        this.getEducacion();
        console.log(error.message);
      }
    })
  }

  public click(idEdu: number, deleteEducacion: Educacion): void {

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
