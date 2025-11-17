<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class NewsStoreRequest extends FormRequest
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
            'title' => 'nullable|string|max:255',
            'content' => 'nullable|string',
            'year' => 'nullable|integer|min:1900|max:' . (date('Y') + 10),
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10048',
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
            'year.min' => 'The year must be at least 1900.',
            'year.max' => 'The year cannot be more than 10 years in the future.',
            'image.max' => 'The image must not be larger than 10MB.',
        ];
    }
}
