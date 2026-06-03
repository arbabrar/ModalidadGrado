<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PagoRequest extends FormRequest
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
            'metodo_pago' => 'required|string|max:50',
            'monto' => 'required|numeric|min:0.01',
            'fecha' => 'required|date',
            'razonsocial' => 'nullable|string|min:2|max:100', // Validación para la razón social
            'nit' => 'nullable|numeric', // Validación para el NIT
        ];
    }

    public function messages()
    {
        return [
            'metodo_pago.required' => 'El método de pago es obligatorio.',
            'metodo_pago.max' => 'El método de pago no puede tener más de 50 caracteres.',
            'monto.required' => 'El monto es obligatorio.',
            'monto.numeric' => 'El monto debe ser un número válido.',
            'monto.min' => 'El monto debe ser mayor a 0.',
            'fecha.required' => 'La fecha es obligatoria.',
            'fecha.date' => 'La fecha debe ser una fecha válida.',
            'razonsocial.min' => 'La razón social debe tener al menos 2 caracteres.',
            'razonsocial.max' => 'La razón social no debe exceder los 100 caracteres.',
            'nit.numeric' => 'El NIT debe ser numérico.',
        ];
    }
}
