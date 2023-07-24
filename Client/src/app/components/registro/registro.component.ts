import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit {
  
  nombre: string = '';
  apellido: string = '';
  dni: string = '';
  mail: string = '';
  telefono: string = '';
  direccion: string = '';
  provincia: string = '';
  codigoPostal: string = '';

  registroForm: FormGroup = new FormGroup({});

  constructor(private dialogRef: MatDialogRef<RegistroComponent>) {}

  ngOnInit() {
    this.initForm();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  private initForm() {
    this.registroForm = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dni: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{8}$/),
      ]),
      mail: new FormControl('', [Validators.required, Validators.email]),
      telefono: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{10}$/),
      ]),
      direccion: new FormControl('', [Validators.required]),
      provincia: new FormControl('', [Validators.required]),
      codigoPostal: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.registroForm.valid) {
      const userData = this.registroForm.value;
      try {
        localStorage.setItem('userData', JSON.stringify(userData));
        this.dialogRef.close({ success: true });
      } catch (error) {
        console.error('Error al guardar en localStorage:', error);
        this.dialogRef.close({ success: false });
      }
    } else {
      this.markAllFieldsAsTouched();
    }
  }

  private markAllFieldsAsTouched() {
    for (const control of Object.values(this.registroForm.controls)) {
      control.markAsTouched();
    }
  }
}
