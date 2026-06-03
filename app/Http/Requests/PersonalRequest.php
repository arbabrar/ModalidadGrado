<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PersonalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
       // dd($this);
        return [
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'documento' => 'required|string|max:20|unique:personal,documento,' . $this->documento,
            'celular' => 'required|string|max:15',
            'direccion' => 'required|string|max:150',
            'fotografia' => 'nullable|string',
            'fecha_nacimiento' => 'required|date',
        ];
    }
    public function messages()
    {
        return [
            'nombre.required' => 'El campo nombre es obligatorio.',
            'nombre.string' => 'El nombre debe ser una cadena de texto válida.',
            'nombre.max' => 'El nombre no debe tener más de 100 caracteres.',
            
            'apellido.required' => 'El campo apellido es obligatorio.',
            'apellido.string' => 'El apellido debe ser una cadena de texto válida.',
            'apellido.max' => 'El apellido no debe tener más de 100 caracteres.',

            'documento.required' => 'El número de documento es obligatorio.',
            'documento.string' => 'El documento debe ser una cadena de texto válida.',
            'documento.max' => 'El número de documento no debe exceder los 20 caracteres.',
            'documento.unique' => 'El documento ya está registrado en el sistema.',

            'celular.required' => 'El campo celular es obligatorio.',
            'celular.string' => 'El número de celular debe ser una cadena de texto válida.',
            'celular.max' => 'El número de celular no debe tener más de 15 caracteres.',

            'direccion.required' => 'El campo dirección es obligatorio.',
            'direccion.string' => 'La dirección debe ser una cadena de texto válida.',
            'direccion.max' => 'La dirección no debe tener más de 150 caracteres.',

            'fotografia.string' => 'El campo fotografía debe ser una cadena de texto válida.',

            'fecha_nacimiento.required' => 'El campo fecha de nacimiento es obligatorio.',
            'fecha_nacimiento.date' => 'La fecha de nacimiento debe ser una fecha válida.',
        ];
    }
}
