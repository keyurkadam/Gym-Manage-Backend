<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MembershipPlans extends Model
{
    use HasFactory;

    protected $primaryKey = 'membership_plan_id';

    protected $fillable = [
        'plan_name',
        'duration_months',
        'price',
        'description',
    ];

    public function members()
    {
        return $this->hasMany(Member::class, 'membership_plan_id');
    }
}
