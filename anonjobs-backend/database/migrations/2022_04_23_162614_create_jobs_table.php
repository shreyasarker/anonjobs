<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->foreignId('user_id')->constrained()->cascadeOnDelete(null);
            $table->string('company');
            $table->string('company_slug');
            $table->string('position');
            $table->string('type');
            $table->enum('is_anon', ['Yes', 'No']);
            $table->enum('is_remote', ['Yes', 'No']);
            $table->string('location');
            $table->longText('description');
            $table->text('how_to_apply');
            $table->string('apply_url_or_email');
            $table->foreignId('min_yearly_salary')->constrained()->cascadeOnDelete(null);
            $table->foreignId('max_yearly_salary')->constrained()->cascadeOnDelete(null);
            $table->enum('is_crypto_salary', ['Yes', 'No']);
            $table->string('crypto_salary_type')->nullable();
            $table->string('company_full_name')->nullable();
            $table->string('company_full_address')->nullable();
            $table->string('company_vat_or_tax_no')->nullable();
            $table->string('company_twitter')->nullable();
            $table->string('coupon_code')->nullable();
            $table->unsignedInteger('pin_duration')->comment('In days');
            $table->unsignedInteger('is_pinned');
            $table->timestamp('pinned_deadline')->nullable();
            $table->string('company_logo')->nullable();
            $table->string('job_highlight_color_type');
            $table->string('job_higlight_color')->nullable();
            $table->enum('enable_message_to_discord', ['Yes', 'No']);
            $table->enum('enable_email_to_subcribers', ['Yes', 'No']);
            $table->unsignedInteger('is_active');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('jobs');
    }
};
