import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Species } from './species';
import { Genera } from '../genera/genera'; // Import the Genera interface
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-species',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './species.component.html',
  styleUrl: './species.component.css'
})
export class SpeciesComponent implements OnInit {
  public species: (Species & { genusScientificName?: string })[] = [];
  private genera: Genera[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getSpeciesAndGenera();
  }

  getSpeciesAndGenera() {
    // Fetch both species and genera, then join them client-side
    this.http.get<Genera[]>(`${environment.baseUrl}api/Genus`).subscribe({
      next: (generaResult) => {
        this.genera = generaResult;

        this.http.get<Species[]>(`${environment.baseUrl}api/Species`).subscribe({
          next: (speciesResult) => {
            // Map each species to include its genus's scientific name
            this.species = speciesResult.map((spec) => {
              const genus = this.genera.find((g) => g.id === spec.genusId);
              return { ...spec, genusScientificName: genus?.scientificName };
            });
          },
          error: (e) => console.error(e)
        });
      },
      error: (e) => console.error(e)
    });
  }
}