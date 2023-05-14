# AnonJobs
AnonJobs: Web3, Blockchain, Smart Contract, Crypto and Jobs using Laravel

### Create Remote Job Circulars Anonymously

### Frontend Project Link: 

## Support
- Laravel 9
- Sanctum Token Based Auth
- Jenssegers Mongodb
- Cloudinary SDK for Laravel


## Usage
```bash

## Setup

1. Clone the repository using "git clone https://github.com/shreyasarker/anonjobs.git"
2. Run `cd anonjobs-backend`
3. Run `composer install`
4. Run `cp .env.example .env` and change the env values
5. Run `composer key:generate`
6. Run `php artisan migrate:fresh --seed`

## Updating changes

1. Run `composer install` to install new packages
2. Run `composer dump-autoload` to autoload new classes
3. Run `php artisan migrate` to migrate new schema changes
3. Run `php artisan db:seed class=NewSeederClass` to seed if any new seeder file is added. Replace `NewSeederClass` with the newly created seeder class
```
