<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FaqUpdateRequest extends FormRequest
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
            'faqs_categoryid' => 'required|exists:faqs_category,id',
            'question' => 'nullable|string|max:500',
            'answer' => 'nullable|string',
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
            'faqs_categoryid.required' => 'Please select a FAQ category.',
            'faqs_categoryid.exists' => 'The selected FAQ category does not exist.',
            'question.max' => 'The question must not exceed 500 characters.',
        ];
    }
}
