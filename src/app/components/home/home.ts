import { Component } from '@angular/core';
import { LoaderService } from '../../shared/helperService/loader-service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  constructor(private $loader: LoaderService) { }

  loadLoader(): void {
    this.$loader.show();
    setTimeout(() => {
      this.$loader.hide();
    }, 5000);
  }
}
