<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $tags = [
            ['name' => 'account-manager'],
            ['name' => 'accounting'],
            ['name' => 'after-effects'],
            ['name' => 'agile'],
            ['name' => 'amazon'],
            ['name' => 'amazon-fba'],
            ['name' => 'analyst'],
            ['name' => 'android'],
            ['name' => 'angular'],
            ['name' => 'ansible'],
            ['name' => 'apache'],
            ['name' => 'api'],
            ['name' => 'architecture'],
            ['name' => 'art-direction'],
            ['name' => 'aws'],
            ['name' => 'backend'],
            ['name' => 'big-data'],
            ['name' => 'biotech'],
            ['name' => 'blockchain'],
            ['name' => 'bootstrap'],
            ['name' => 'btc'],
            ['name' => 'c++'],
            ['name' => 'c#'],
            ['name' => 'cassandra'],
            ['name' => 'chatbot'],
            ['name' => 'clojure'],
            ['name' => 'cloud'],
            ['name' => 'cobol'],
            ['name' => 'coldfusion'],
            ['name' => 'community-manager'],
            ['name' => 'compliance-'],
            ['name' => 'consulting'],
            ['name' => 'contracting'],
            ['name' => 'copywriting'],
            ['name' => 'crm'],
            ['name' => 'crypto'],
            ['name' => 'css'],
            ['name' => 'customer-support'],
            ['name' => 'cto'],
            ['name' => 'dao'],
            ['name' => 'dapp'],
            ['name' => 'data-entry'],
            ['name' => 'data-science'],
            ['name' => 'data-viz'],
            ['name' => 'dataops'],
            ['name' => 'dba'],
            ['name' => 'defi'],
            ['name' => 'design'],
            ['name' => 'devops'],
            ['name' => 'docker'],
            ['name' => 'dot-net'],
            ['name' => 'drupal'],
            ['name' => 'ecommerce'],
            ['name' => 'education'],
            ['name' => 'elasticsearch'],
            ['name' => 'embedded'],
            ['name' => 'ember'],
            ['name' => 'english-teacher'],
            ['name' => 'entry-level'],
            ['name' => 'erlang'],
            ['name' => 'esports'],
            ['name' => 'events-manager'],
            ['name' => 'executive'],
            ['name' => 'f-sharp'],
            ['name' => 'finance'],
            ['name' => 'firebase'],
            ['name' => 'flutter'],
            ['name' => 'fortran'],
            ['name' => 'front-end'],
            ['name' => 'full-stack'],
            ['name' => 'game-dev'],
            ['name' => 'golang'],
            ['name' => 'grafana'],
            ['name' => 'graphql'],
            ['name' => 'groovy'],
            ['name' => 'hadoop'],
            ['name' => 'hardware'],
            ['name' => 'haskell'],
            ['name' => 'hr'],
            ['name' => 'illustrator'],
            ['name' => 'intern'],
            ['name' => 'ios'],
            ['name' => 'java'],
            ['name' => 'javascript'],
            ['name' => 'jquery'],
            ['name' => 'kyc'],
            ['name' => 'lamp'],
            ['name' => 'laravel'],
            ['name' => 'legal'],
            ['name' => 'linguistics'],
            ['name' => 'linode'],
            ['name' => 'linux'],
            ['name' => 'lisp'],
            ['name' => 'machine-learning'],
            ['name' => 'macos'],
            ['name' => 'marketing'],
            ['name' => 'math'],
            ['name' => 'matlab'],
            ['name' => 'medical'],
            ['name' => 'mern'],
            ['name' => 'metaverse'],
            ['name' => 'meteor'],
            ['name' => 'mobile'],
            ['name' => 'mongo'],
            ['name' => 'music'],
            ['name' => 'nextjs'],
            ['name' => 'nft'],
            ['name' => 'nginx'],
            ['name' => 'node'],
            ['name' => 'nosql'],
            ['name' => 'objective-c'],
            ['name' => 'open stack'],
            ['name' => 'operations'],
            ['name' => 'pascal'],
            ['name' => 'perl'],
            ['name' => 'phonegap'],
            ['name' => 'photoshop'],
            ['name' => 'php'],
            ['name' => 'postgres'],
            ['name' => 'product-manager'],
            ['name' => 'project-manager'],
            ['name' => 'python'],
            ['name' => 'quality-assurance'],
            ['name' => 'rabbitmq'],
            ['name' => 'react'],
            ['name' => 'react-native'],
            ['name' => 'recruiter'],
            ['name' => 'redis'],
            ['name' => 'research'],
            ['name' => 'robotics'],
            ['name' => 'ruby'],
            ['name' => 'rust'],
            ['name' => 'saas'],
            ['name' => 'sales'],
            ['name' => 'salesforce'],
            ['name' => 'scala'],
            ['name' => 'scheme'],
            ['name' => 'scrum'],
            ['name' => 'security'],
            ['name' => 'seo'],
            ['name' => 'serverless'],
            ['name' => 'smart-contract'],
            ['name' => 'social media'],
            ['name' => 'solidity'],
            ['name' => 'sql'],
            ['name' => 'stats'],
            ['name' => 'swift'],
            ['name' => 'symfony'],
            ['name' => 'sys-admin'],
            ['name' => 'teaching'],
            ['name' => 'tech-lead'],
            ['name' => 'telecommuting'],
            ['name' => 'trader'],
            ['name' => 'transcribing'],
            ['name' => 'translator'],
            ['name' => 'vagrant'],
            ['name' => 'vfx'],
            ['name' => 'video'],
            ['name' => 'virtual-assistant'],
            ['name' => 'virtual-reality'],
            ['name' => 'visual-basic'],
            ['name' => 'voip'],
            ['name' => 'vue'],
            ['name' => 'video'],
            ['name' => 'web3js'],
            ['name' => 'win-phone'],
            ['name' => 'wordpress'],
            ['name' => 'xamarin'],

        ];

        $tagExists = Tag::exists();

        if (!$tagExists) {
            foreach ($tags as $tag) {
                Tag::create($tag);
            }
        }
    }
}
