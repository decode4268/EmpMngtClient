import { Component, signal } from '@angular/core';
import { LoaderService } from '../../shared/helperService/loader-service';
import { ApiService } from '../../services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../../helpers/ValidateForm';


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

  // jobLocationRes: jobLocations[] | undefined;
  jobLocationRes = signal<jobLocations[]>([]);
  addNewJob: FormGroup;
  constructor(private $loader: LoaderService,
    private apiService: ApiService, public fb: FormBuilder) {

    this.addNewJob = this.fb.group({
      jobTitle: ['', Validators.required],
      jobLocation: ['', Validators.required],
      status: [''],
      ctc: ['', Validators.required],
    })
    this.getJobLocations();
  }

  getJobLocations() {
    this.apiService.getJobLocation().subscribe({
      next: (res) => {
        // this.jobLocationRes = res;
        this.jobLocationRes.set(res ?? []);
      },
      error: (err) => {
        // this.jobLocationRes = [];
        this.jobLocationRes.set([]);
      }
    })
  }

  SaveNewJob(): void {
    if (this.addNewJob.valid) {

      console.log("add new Job form value", this.addNewJob.value);

      let payload = {
        locationId: this.addNewJob.value.jobLocation,
        jobDetails: this.addNewJob.value.jobTitle,
        ctc: this.addNewJob.value.ctc,
        status: this.addNewJob.value.status
      };
      this.apiService.addNewJob(payload).subscribe({
        next: (res) => {
          if (res.status == 200) {
            alert(res.message);
          }
          else {
            alert(res.message);
          }
        },
        error: (err) => {
          alert(err.err.message);
        }
      })
    }
    else {
      this.addNewJob.markAllAsTouched();
      // ValidateForm.validateAllFormFields(this.addNewJob);
    }
  }

  // loadLoader(): void {
  //   this.$loader.show();
  //   setTimeout(() => {
  //     this.$loader.hide();
  //   }, 5000);
  // }

}
