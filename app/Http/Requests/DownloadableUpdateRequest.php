<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DownloadableUpdateRequest extends FormRequest
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
            'downloadable_category_id' => 'required|exists:downloadable_categories,id',
            'title' => 'required|string|max:255',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,txt,zip,rar|max:10240',
            'remove_file' => 'nullable|boolean',
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
            'downloadable_category_id.required' => 'Please select a category.',
            'downloadable_category_id.exists' => 'The selected category does not exist.',
            'title.required' => 'The title is required.',
            'file.mimes' => 'The file must be a PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX, TXT, ZIP, or RAR.',
            'file.max' => 'The file must not be larger than 10MB.',
        ];
    }
}
