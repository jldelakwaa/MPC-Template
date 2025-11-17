<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class OfficerStoreRequest extends FormRequest
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
            'officer_category_id' => 'nullable|exists:officer_categories,id',
            'name' => 'nullable|string|max:255',
            'position' => 'nullable|string|max:255',
            'birthday' => 'nullable|date',
            'yearservice' => 'nullable|date',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'officer_category_id.exists' => 'The selected category does not exist.',
            'birthday.date' => 'The birthday must be a valid date.',
            'yearservice.date' => 'The year of service must be a valid date.',
            'image.max' => 'The image must not be larger than 2MB.',
        ];
    }
}
