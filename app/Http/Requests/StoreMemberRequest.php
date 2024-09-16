<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'date_of_birth' => 'required|date',
            'email' => 'required|email|unique:members,email',
            'phone_number' => 'required|string|max:15',
            'address' => 'required|string|max:255',
            'membership_plan_name' => 'required|string|exists:membership_plans,plan_name',
            'join_date' => 'required|date',
            'status' => 'required|in:active,inactive,expired',
        ];
    }
}
