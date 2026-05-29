import { Component, inject } from '@angular/core';
import { LoaderService } from '../helperService/loader-service';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader-component.html',
  styleUrl: './loader-component.css',
})
export class LoaderComponent {
  loader = inject(LoaderService);
}
