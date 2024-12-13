import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../environments/environment.development';
import { Species } from '../species/species';
import { Genera } from './genera';

@Component({
  selector: 'app-genera-species',
  templateUrl: './genera-species.component.html',
  styleUrl: './genera-species.component.css'
})
export class GeneraSpeciesComponent implements OnInit {
  public species: Species[] = [];
  public genusScientificName: string = '';
  private genusId!: number;

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Check if the user is logged in
    const token = localStorage.getItem('veryImportantToken');
    if (!token) {
      // Redirect to login page if token is not found
      this.router.navigate(['/login']);
    }
    this.route.params.subscribe(params => {
      this.genusId = +params['id'];
      this.fetchGenusSpecies();
    });
  }

  fetchGenusSpecies() {
    this.http.get<Genera>(`${environment.baseUrl}api/Genus/${this.genusId}`).subscribe({
      next: (genusResult) => {
        this.genusScientificName = genusResult.scientificName;
        this.http.get<Species[]>(`${environment.baseUrl}api/Species/genus-species/${this.genusId}`).subscribe({
          next: (result) => {
            this.species = result;
      },
      error: (e) => console.error(e)
    });
  },
  error: (e) => console.error(e)
});
}
}