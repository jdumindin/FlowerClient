import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Genera } from './genera';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-genera',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './genera.component.html',
  styleUrl: './genera.component.css'
})
export class GeneraComponent implements OnInit {
  public genera: Genera[] = [];
  constructor(private http: HttpClient) {}
  
  ngOnInit(): void {
    this.getGenera()
  }
  
  getGenera() {
    this.http.get<Genera[]>(`${environment.baseUrl}api/Genus`).subscribe(
      {
        next: result => this.genera = result,
        error: e => console.error(e)
      }
    );
  }
}
