<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehiculoRequest extends FormRequest
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
      return [
          'placa' => 'required|string|max:10|unique:vehiculos,placa',
          'clase' => 'required|string|max:50',
          'color' => 'required|string|max:30',
          'modelo' => 'required|string|max:50',
          'marca' => 'required|string|max:50',
          'tipo' => 'required|string|max:30',
      ];
    }

    public function messages()
    {
        return [
            'placa.required' => 'La placa es obligatoria.',
            'placa.max' => 'La placa no puede exceder los 10 caracteres.',
            'placa.unique' => 'La placa ya está registrada en el sistema.',
            'clase.required' => 'La clase es obligatoria.',
            'color.required' => 'El color es obligatorio.',
            'modelo.required' => 'El modelo es obligatorio.',
            'marca.required' => 'La marca es obligatoria.',
            'tipo.required' => 'El tipo es obligatorio.',
        ];
    }
}
