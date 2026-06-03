<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class natural extends Model
{
    use HasFactory;
    protected $table = 'natural';
    protected $fillable = ['nombre', 'apellido_paterno', 'apellido_materno', 'fecha_nacimiento', 'genero', 'cliente_id'];

    public function cliente()
    {
        return $this->belongsTo(cliente::class);
    }
}
