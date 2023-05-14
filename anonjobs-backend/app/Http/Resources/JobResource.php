<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Auth;

class JobResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $arrayData = [
            'id' => $this->_id,
            'company_initial' => $this->company[0],
            'company' => $this->company,
            'company_slug' => $this->company_slug,
            'position' => $this->position,
            'position_slug' => createSlug($this->position),
            'type' => $this->type,
            'is_anon' => $this->is_anon,
            'is_remote' => $this->is_remote,
            'tags' => $this->getTags(),
            'tag_names' => $this->getTagNames(),
            'tag_ids' => $this->getTagIds(),
            'location' => $this->location,
            'description' => $this->description,
            'how_to_apply' => $this->how_to_apply,
            'apply_email' => isEmail($this->apply_url_or_email),
            'apply_url_or_email' => $this->apply_url_or_email,
            'salary' => $this->getSalary(),
            'crypto_salary' => $this->is_crypto_salary === 'Yes' ? $this->crypto_salary_type : '',
            'display_crypto_salary' => $this->is_crypto_salary === 'Yes' ? $this->crypto_salary_type : 'N/A',
            'is_pinned' => $this->is_pinned,
            'company_logo' => $this->company_logo,
            'job_highlight_color_type' => $this->job_highlight_color_type,
            'job_higlight_color' => $this->job_higlight_color,
            'created_at'=> $this->created_at->format('jS M, Y'),
            'is_editable' => $this->ownsJob()
        ];

        if ($this->ownsJob()) {
            $arrayData['min_yearly_salary'] = $this->min_yearly_salary;
            $arrayData['max_yearly_salary'] = $this->max_yearly_salary;
            $arrayData['is_crypto_salary'] = $this->is_crypto_salary;
            $arrayData['crypto_salary_type'] = $this->crypto_salary_type ?: "";
            $arrayData['company_full_name'] = $this->company_full_name ?: "";
            $arrayData['company_full_address'] = $this->company_full_address ?: "";
            $arrayData['company_vat_or_tax_no'] = $this->company_vat_or_tax_no ?: "";
            $arrayData['company_twitter'] = $this->company_twitter ?: "";
            $arrayData['coupon_code'] = $this->coupon_code ?: "";
            $arrayData['pin_duration'] = $this->pin_duration;
            $arrayData['display_pin_duration'] = config('labels.pin.duration_'.$this->pin_duration);
            $arrayData['enable_message_to_discord'] = $this->enable_message_to_discord;
            $arrayData['enable_email_to_subcribers'] = $this->enable_email_to_subcribers;
            $arrayData['is_active'] = $this->is_active ? 'Active' : 'Not Active';
        }

        return $arrayData;
    }

    private function ownsJob()
    {
        if(!Auth::check()) return false;
        return $this->user_id ===  Auth::user()->_id;
    }

    private function getTags()
    {
        $formattedTags = [];
        foreach ($this->tags as $tag) {
            $formattedTags[] = [
                'value' => $tag['_id'],
                'label' => $tag['name']
            ];
        }
        return $formattedTags;
    }

    private function getTagNames()
    {
        $formattedTags = [];
        foreach ($this->tags as $tag) {
            $formattedTags[] = $tag['name'];
        }
        return $formattedTags;
    }

    private function getTagIds()
    {
        $formattedTags = [];
        foreach ($this->tags as $tag) {
            $formattedTags[] = $tag['_id'];
        }
        return $formattedTags;
    }

    private function getSalary()
    {
        if ($this->min_yearly_salary && $this->max_yearly_salary) {
            return $this->minYearlySalary->currency . '' . $this->minYearlySalary->salary . '-' . $this->maxYearlySalary->currency . '' . $this->maxYearlySalary->salary;
        } elseif (!$this->min_yearly_salary && $this->max_yearly_salary) {
            return $this->maxYearlySalary->currency . '' . $this->maxYearlySalary->salary;
        } elseif ($this->min_yearly_salary && !$this->max_yearly_salary) {
            return $this->minYearlySalary->currency . '' . $this->minYearlySalary->salary;
        }
        return "N/A";
    }
}
