<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\Auth;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\SoftDeletes;

class Job extends Model
{
    use HasFactory, SoftDeletes;


    protected $fillable = [
        'user_id', 'company', 'company_slug', 'position', 'type', 'is_anon', 'is_remote', 'location',
        'description', 'how_to_apply', 'apply_url_or_email', 'min_yearly_salary', 
        'max_yearly_salary', 'is_crypto_salary', 'crypto_salary_type', 'company_full_name', 
        'company_full_address', 'company_vat_or_tax_no', 'company_twitter', 'coupon_code', 
        'pin_duration', 'is_pinned', 'pinned_deadline', 'company_logo', 
        'job_highlight_color_type', 'job_higlight_color', 'enable_message_to_discord', 
        'enable_email_to_subcribers', 'is_active'
    ];

    protected $dates = ['created_at', 'updated_at', 'deleted_at'];

    public function tags()
    {
        return $this->belongsToMany(Tag::class, null, 'job_ids', 'tag_ids')->withTimestamps();
    }

    public function minYearlySalary()
    {
        return $this->belongsTo(YearlySalary::class, 'min_yearly_salary');
    }

    public function maxYearlySalary()
    {
        return $this->belongsTo(YearlySalary::class, 'max_yearly_salary');
    }

    public function scopeActive($query)
    {
        $query->where('is_active', 1);
    }

    public function scopePinned($query)
    {
        $query->where('is_pinned', 1);
    }

    public function scopeOfAuthUser($query)
    {
        $query->where('user_id', Auth::user()->_id);
    }

    public function scopeByCompany($query, $company)
    {
        $query->where('user_id', Auth::user()->_id);
    }

    public function scopeWithFilters($query, $search, $tag, $isAnon, $isRemote)
    {
         $query->when($search, function ($query) use ($search){
            $query->where(function ($query) use ($search){
                $query->where('position', 'like', '%'.$search.'%')
                    ->orWhere('company', 'like', '%'.$search.'%')
                    ->orWhere('type', 'like', '%'.$search.'%')
                    ->orWhere('location', 'like', '%'.$search.'%')
                    ->orWhere('description', 'like', '%'.$search.'%')
                    ->orWhere('crypto_salary_type', 'like', '%'.$search.'%');
            });
        });
        $query->when($tag, function ($query) use ($tag) {
            $existingTag = Tag::where('name', $tag)->first();
            $query->where('tag_ids', $existingTag->_id);
        });
        $query->when($isAnon, function ($query) use ($isAnon) {
            $query->where('is_anon', $isAnon);
        });
        $query->when($isRemote, function ($query) use ($isRemote) {
            $query->where('is_remote', $isRemote);
        });
        return $query;
    }
}
