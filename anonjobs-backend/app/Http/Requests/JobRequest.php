<?php

namespace App\Http\Requests;

use App\Rules\Rules\IsUrlOrEmail;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class JobRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $id = $this->route('id');
        $rules = [
            'company' => 'required|string|max:191',
            'position' => 'required|string|max:191',
            'type' => 'required|string|max:191',
            'is_anon' => 'required|string|in:Yes,No',
            'is_remote' => 'required|string|in:Yes,No',
            'tags' => 'required|array|min:1|max:5',
            'tags.*' => 'string',
            'location' => 'required|string|max:191',
            'description' => 'required|string|max:20000',
            'how_to_apply' => 'required|string|max:2000',
            'apply_url_or_email' => ['required', 'string', 'max:191', new IsUrlOrEmail()],
            'min_yearly_salary' => 'required|string|max:191',
            'max_yearly_salary' => 'required|string|max:191',
            'is_crypto_salary' => 'required|string|in:Yes,No',
            'crypto_salary_type' => 'nullable|required_if:is_crypto_salary,Yes|string|max:191',
            'company_full_name' => 'nullable|string|max:191',
            'company_full_address' => 'nullable|string|max:191',
            'company_vat_or_tax_no' => 'nullable|string|max:191',
            'company_twitter' => 'nullable|string|max:191',
            'coupon_code' => 'nullable|string|max:191',
            // 'pin_duration' => 'required|numeric|max:100',
            'company_logo' => 'nullable|imageable',
            // 'job_highlight_color_type' => 'required|string|max:100',
            // 'job_higlight_color' => 'required_if:job_highlight_color_type,Custom|string|max:7',
            'enable_message_to_discord' => 'required|string|in:Yes,No',
            'enable_email_to_subcribers' => 'required|string|in:Yes,No'
        ];
        if(!$id){
            $rules['pin_duration'] = 'required|numeric|max:100';
            $rules['job_highlight_color_type'] = 'required|string|max:100';
            $rules['job_higlight_color'] = 'required_if:job_highlight_color_type,Custom|string|max:7';
        }
        return $rules;
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'crypto_salary_type.required_if' => 'The crypto salary field is required.',
            'job_higlight_color.required_if' => 'The job highlight color field is required.'
        ];
    }
}
