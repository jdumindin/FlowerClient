import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Genera } from '../genera/genera';
import { RouterLink, Router } from '@angular/router';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  generaForm!: FormGroup; // Form for creating a new genus
  speciesForm!: FormGroup; // Form for creating a new species
  generaList: Genera[] = []; // List of existing genera

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {

    const token = localStorage.getItem('veryImportantToken');
    if (!token) {
      this.router.navigate(['/login']);
    } else {
      this.initializeForms();
      this.loadGenera();
    }
  }

  // Initialize reactive forms
  initializeForms() {
    this.generaForm = this.fb.group({
      colloquialName: ['', [Validators.required, Validators.maxLength(50)]],
      scientificName: ['', [Validators.required, Validators.maxLength(50)]],
    });

    this.speciesForm = this.fb.group({
      colloquialName: ['', [Validators.required, Validators.maxLength(50)]],
      scientificName: ['', [Validators.required, Validators.maxLength(50)]],
      genusId: [null, [Validators.required]], // Dropdown for genus selection
    });
  }

  // Fetch genera for the dropdown
  loadGenera() {
    this.http.get<Genera[]>(`${environment.baseUrl}api/Genus`).subscribe({
      next: (genera) => (this.generaList = genera),
      error: (e) => console.error('Failed to load genera', e),
    });
  }

  onSubmitGenus() {
    if (this.generaForm.valid) {
      this.http.post(`${environment.baseUrl}api/Genus`, this.generaForm.value).subscribe({
        next: () => {
          this.generaForm.reset();
          this.loadGenera();
          this.router.navigate(['/genera']);
        },
        error: (e) => console.error('Failed to create genus', e),
      });
    }
  }

  // Handle species form submission
  onSubmitSpecies() {
    if (this.speciesForm.valid) {
      const formValue = this.speciesForm.value;
  
      // Ensure genusId is the correct type (number or string)
      const genusId = Number(formValue.genusId); // Assuming `id` is a number
  
      // Find the selected genus from the list based on genusId
      const selectedGenus = this.generaList.find(genus => genus.id === genusId);
  
      if (selectedGenus) {
        // Structure the payload to include genus details, but avoid circular references
        const speciesPayload = {
          id: 0, // New species, so id can be 0 or omitted
          scientificName: formValue.scientificName,
          colloquialName: formValue.colloquialName,
          genusId: selectedGenus.id, // Pass the genusId
        };

        console.log("Species Payload:", JSON.stringify(speciesPayload, null, 2));
  
        // Submit the payload to create the species
        this.http.post(`${environment.baseUrl}api/Species/Create-Species`, speciesPayload).subscribe({
          next: () => {
            this.speciesForm.reset();
          },
          error: (e) => {
            console.error('Failed to create species', e);
            this.router.navigate(["/species"]);
          },
        });
      } else {
        console.error('Selected genus not found! Make sure the genusId is correct.');
      }
    }
  }
}