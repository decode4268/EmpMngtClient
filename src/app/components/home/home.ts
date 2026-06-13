import { Component } from '@angular/core';
import { LoaderService } from '../../shared/helperService/loader-service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


interface jobLocations {
  id: any,
  value: any,
  description: any
}
@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  jobLocationRes: jobLocations[] | undefined;
  addNewJob: FormGroup;
  constructor(private $loader: LoaderService,
    private apiService: ApiService, public fb: FormBuilder) {

    this.addNewJob = this.fb.group({
      jobTitle: ['', Validators.required],
      jobLocation: ['', Validators.required],
      status: ['', Validators.required],
      ctc: ['', Validators.required],
    })
    this.getJobLocations();
  }

  getJobLocations() {
    this.apiService.getJobLocation().subscribe({
      next: (res) => {
        this.jobLocationRes = res;
      },
      error: (err) => {
        this.jobLocationRes = [];
      }
    })
  }

  SaveNewJob(): void {
    console.log("add new Job form value",this.addNewJob.value());
  }

  // loadLoader(): void {
  //   this.$loader.show();
  //   setTimeout(() => {
  //     this.$loader.hide();
  //   }, 5000);
  // }

}
