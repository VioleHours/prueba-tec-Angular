import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {

  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  mail: string = '';
  telefono: string = '';
  direccion: string = '';
  provincia: string = '';
  codigoPostal: string = '';

  constructor(private dialogRef: MatDialogRef<RegistroComponent>) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const userData = {
      nombre: this.nombre,
      apellido: this.apellido,
      dni: this.dni,
      mail: this.mail,
      telefono: this.telefono,
      direccion: this.direccion,
      provincia: this.provincia,
      codigoPostal: this.codigoPostal,
    };

    localStorage.setItem('userData', JSON.stringify(userData));

    this.dialogRef.close();
  }
}
