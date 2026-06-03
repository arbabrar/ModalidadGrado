<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class juridico extends Model
{
    use HasFactory;
    protected $table = 'juridico';
    protected $fillable = ['razon_social', 'no_patron', 'representante_legal', 'cliente_id'];

    public function cliente()
    {
        return $this->belongsTo(Cliente::class);
    }
}
