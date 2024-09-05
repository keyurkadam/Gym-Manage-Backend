<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMembershipPlanRequest extends FormRequest
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
            'plan_name' => 'required|string|max:50',
            'duration_months' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'description' => 'nullable|string',
        ];
    }

    public function messages()
    {
        return [
            'plan_name.required' => 'The plan name is required.',
            'duration_months.required' => 'The duration (in months) is required.',
            'price.required' => 'The price is required.',
        ];
    }
}
