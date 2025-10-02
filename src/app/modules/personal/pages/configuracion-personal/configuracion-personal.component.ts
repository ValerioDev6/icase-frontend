import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { IPersonalResponseData } from '../../../../core/interfaces/persona-resposponse';
import { PersonalService } from '../../../../core/services/personal.service';

@Component({
	selector: 'app-configuracion-personal',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './configuracion-personal.component.html',
	styleUrl: './configuracion-personal.component.scss',
})
export default class ConfiguracionPersonalComponent implements OnInit {
	private readonly personaServie = inject(PersonalService);
	personal: IPersonalResponseData | null = null;
	personalId: string | null = null;

	constructor(private route: ActivatedRoute) {}

	ngOnInit() {
		this.route.paramMap.subscribe((params) => {
			this.personalId = params.get('id');
			// Aquí deberías cargar los datos del personal usando este ID
			// Por ejemplo: this.loadPersonalData(this.personalId);
			this.cargarDatos(this.personalId!);
		});
	}

	// ngOnInit() {
	// 	// Obtener el ID de la URL
	// 	const personaId = this.route.snapshot.paramMap.get('id');

	// 	if (personaId) {
	// 		this.cargarDatos(personaId);
	// 	}
	// }

	cargarDatos(id: string) {
		this.personaServie.getPersonalById(id).subscribe({
			next: (response) => {
				this.personal = response;
			},
			error: (error) => {
				console.log('error al cargar datos ', error);
			},
		});
	}
}
