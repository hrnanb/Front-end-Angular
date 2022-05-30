import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SkillsService } from 'src/app/servicios/skills.service';
import { Skills } from 'src/app/models/skills';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {


@Input()isLogged:any;

  public skills: Skills[] = [];
  public editSkills: Skills | undefined;
  public deleteSkills: Skills | undefined;


  //Modal
  range:number;
  color:string;



  constructor(private skillsService : SkillsService) { }

  ngOnInit(): void {
    this.getSkills();

  }

  public getSkills(): void {
    this.skillsService.getSkills().subscribe({
      next: (response: Skills[]) => {
        this.skills = response;


      },
      error: (error: HttpErrorResponse) => {
        console.log(error.message)
      }
    })
  }


  public onOpenModal(mode: String, skills?: Skills): void {

    const container = document.getElementById('container');
    const button = document.createElement('button');
    button.style.display = 'none';
    button.setAttribute('date-toggle', 'modal');
    if (mode === 'addSkills') {
      button.setAttribute(' data-bs-target', '#addSkillsModal');
    } else if (mode === 'deleteSkills') {
      this.deleteSkills = skills;
    } else if (mode === 'editSkills') {
      this.editSkills = skills;
      button.setAttribute('data-bs-target', '#addSkillsModal')
    }
    container?.appendChild
    button.click();
  }


  public onAddSkills(addForm: NgForm) {
    document.getElementById('add-fom')?.click();
    this.skillsService.addSkills(addForm.value).subscribe({
      next: (response: Skills) => {
        console.log(response);
        this.getSkills();
        addForm.reset();

      },
      error: (error: HttpErrorResponse) => {
        this.getSkills();
        console.log(error.message);
        addForm.reset();
      }
    })
  }

  public onUpdateSkills(skills: Skills) {
    this.editSkills = skills;
    document.getElementById('add-persona-fom')?.click();
    this.skillsService.updateSkills(skills).subscribe({

      next: (response: Skills) => {
        console.log(response);
        this.getSkills();
        console.log(skills);
        console.log(this.editSkills)

      },
      error: (error: HttpErrorResponse) => {
        this.getSkills();
        console.log(error.message);
      }
    })
  }

  public onDeleteSkills(idSkill: number, skills: Skills): void {
    this.skillsService.deleteSkills(idSkill).subscribe({
      next: (response: void) => {
        console.log(response);
        this.getSkills();

      },
      error: (error: HttpErrorResponse) => {
        this.getSkills();
        console.log(error.message);
      }
    })
  }

  public click(idSkill: number, deleteSkills: Skills): void {

  }




}
