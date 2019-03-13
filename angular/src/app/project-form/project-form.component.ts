import { Component, OnInit, Input, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectFormService } from './project-form.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Project } from '../models/project'

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})

export class ProjectFormComponent implements OnInit {

  project;
  projectForm;
  submitted = false;
  deleted = false;
  response = null;

  onSubmit() {
    this.submitted = true;
    if (!this.project) {
      this.projectFormService.create(this.projectForm.value).subscribe((response) => {
        this.response = response;
        this.router.navigate(['/discover']);
      },
      error => {
        console.log(this.projectForm.value);
      });
    } else {
      this.projectFormService.edit(this.projectForm.value, this.project.id).subscribe((response) => {
        this.response = response;
        this.router.navigate(['/discover']);
      },
      error => {
        console.log(this.projectForm.value);
      });
    }
  }

  onDelete() {
    this.deleted = true;
    this.projectFormService.delete({'id': this.project.id}).subscribe((response) => {
      this.router.navigate(['/discover']);
    },
    error => {
      console.log(this.projectForm.value);
    });
  }

  constructor(
    private fb: FormBuilder,
    private projectFormService: ProjectFormService,
    public router: Router
  ) {
  }

  ngOnInit() {
    this.project = JSON.parse(localStorage.getItem('project'));
    localStorage.removeItem("project");
    this.projectForm = this.fb.group({
      user_id: localStorage.getItem("user_id"),
      name: [this.project && this.project["name"] || null, Validators.required],
      description: [this.project && this.project.description || null, Validators.required],
      url: [this.project && this.project.url || null, Validators.required],
      github: [this.project && this.project.github || null, Validators.required]
    });
  }

}
