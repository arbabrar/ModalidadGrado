<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductoRequest extends FormRequest
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
          'nombreproducto' => 'required|string|max:255',
          'unidadMedida' => 'required|string|max:100',
          'cantidad' => 'required|integer|min:1',
          'costo' => 'required|numeric|between:0,999999.99', // Costo puede ser decimal
      ];
    }

    /**
     * Personaliza los mensajes de validación.
     */
    public function messages()
    {
        return [
            'nombreproducto.required' => 'El nombre del producto es obligatorio.',
            'unidadMedida.required' => 'La unidad de medida es obligatoria.',
            'cantidad.required' => 'La cantidad es obligatoria.',
            'costo.required' => 'El costo es obligatorio.',
            'costo.numeric' => 'El costo debe ser un número válido.',
            'costo.between' => 'El costo debe ser un valor entre 0 y 999999.99.',
        ];
    }
}
