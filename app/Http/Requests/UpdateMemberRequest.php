<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateMemberRequest extends FormRequest
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
            'first_name' => 'sometimes|string|max:50',
            'last_name' => 'sometimes|string|max:50',
            'date_of_birth' => 'sometimes|date',
            'email' => 'sometimes|email|unique:members,email,' . $this->route('member'),
            'phone_number' => 'sometimes|string|max:15',
            'address' => 'sometimes|string|max:255',
            'membership_plan_name' => 'required|string|exists:membership_plans,plan_name',
            'join_date' => 'sometimes|date',
            'status' => 'sometimes|in:active,inactive,expired',
        ];
    }
}
