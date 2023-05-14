<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>AnonJobs: Web3, Blockchain, Smart Contract, Crypto and Jobs</title>

    <!-- Styles -->
    <style>
        html {
            font-size: 10px;
        }
        @media only screen and (max-width:400px) {
            html {
                font-size: 9.411764705882353px;
            }
        }
        html, body {
            height: 100%;
            overflow: hidden;
        }
        body {
            background: #111111;
            font-family: "metropolis-regular", sans-serif;
            font-size: 1.7rem;
            font-style: normal;
            font-weight: normal;
            line-height: 1.765;
            color: #757575;
            margin: 0;
            padding: 0;
        }
        a {
            text-decoration: none;
            color: #ec008c;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
        }
        a:hover,
        a:focus,
        a:active {
            color: #0087cc;
        }
        a:hover,
        a:active {
            outline: 0;
        }
        h1, h3,.h1, .h3 {
            font-family: "domine-regular", serif;
            color: #000000;
            font-style: normal;
            font-weight: normal;
            text-rendering: optimizeLegibility;
            margin-top: 6rem;
            margin-bottom: 1.8rem;
        }
        @media only screen and (max-width:600px) {
            h1, .h1, h3, .h3 {
                margin-top: 5.1rem;
            }
        }
        h1, .h1 {
            font-size: 3.6rem;
            line-height: 1.25;
            letter-spacing: -.1rem;
        }
        @media only screen and (max-width:600px) {
            h1, .h1 {
                font-size: 3.3rem;
                letter-spacing: -.07rem;
            }
        }
        .s-home {
            z-index: 501;
            display: table;
            width: 100%;
            height: 100%;
            min-height: 720px;
            background-color: #111111;
            position: relative;
            -webkit-transform: translateZ(0);
            -ms-transform: translateZ(0);
            transform: translateZ(0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            height: 100vh;
            overflow-y: auto;
            -webkit-transition: -webkit-transform 0.7s;
            transition: transform 0.7s;
            -webkit-transition-timing-function: cubic-bezier(0.91, 0.01, 0.6, 0.99);
            transition-timing-function: cubic-bezier(0.91, 0.01, 0.6, 0.99);
        }
        .s-home--static {
            background-position: center center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .s-home--static::before {
            display: block;
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .85;
            background: linear-gradient(to right, black 0%, black 20%, transparent 100%);
        }
        .s-home .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .3;
            background-color: #000000;
        }
        .home-logo {
            z-index: 502;
            display: block;
            margin: 0;
            padding: 0;
            position: absolute;
            right: 60px;
            top: 36px;
        }
        .home-logo a {
            display: block;
            margin: 0;
            padding: 0;
            outline: 0;
            border: none;
            -webkit-transition: all 0.3s ease-in-out;
            transition: all 0.3s ease-in-out;
        }
        .home-content {
            display: table-cell;
            width: 100%;
            height: 100%;
            vertical-align: middle;
            padding-bottom: 6rem;
            position: relative;
        }
        .home-content h3 {
            font-family: "metropolis-medium", sans-serif;
            font-size: 1.4rem;
            line-height: 1.286;
            text-transform: uppercase;
            letter-spacing: .3rem;
            color: white;
            margin-top: 0;
            margin-bottom: 3rem;
            padding-left: 55px;
            position: relative;
        }
        .home-content h3::before {
            content: "";
            display: block;
            background-color: rgba(236, 0, 140, 0.6);
            width: 40px;
            height: 1px;
            position: absolute;
            left: 0;
            top: 50%;
        }
        .home-content h1 {
            font-size: 6.4rem;
            line-height: 1.219;
            margin-top: 0;
            color: #FFFFFF;
            letter-spacing: 0;
        }
        .home-content__main {
            max-width: 1400px;
            padding-top: 15rem;
            position: relative;
            overflow: hidden;
        }
        .row {
            margin: 0 auto;
            max-width: 1200px;
            width: 94%;
        }
        .home-content__line {
            display: block;
            width: 1px;
            height: 12rem;
            background-color: #ec008c;
            position: absolute;
            right: 84px;
            bottom: 0;
        }
        .pull-right {
            float: right;
        }
        @media only screen and (max-width:1500px) {
            .home-content h1 {
                font-size: 5.8rem;
            }

            .home-content__main {
                max-width: 1200px;
            }
        }
        @media only screen and (max-width:1400px) {
            .home-logo {
                right: 35px;
            }
            .home-content h1 {
                font-size: 5rem;
            }
            .home-content__main {
                max-width: 1000px;
            }
            .home-content__line {
                right: 54px;
            }
        }
        @media only screen and (max-width:1200px) {
            .home-content h3 {
                padding-left: 45px;
            }
            .home-content h3::before {
                width: 30px;
            }
            .home-content h1 {
                font-size: 4.2rem;
            }
            .home-content__main {
                max-width: 900px;
            }
            .home-content__text {
                padding-right: 30px;
            }
        }
        @media only screen and (max-width:1000px) {
            .s-home, .home-content {
                display: block;
            }
            .home-content {
                overflow-y: auto;
            }
            .home-content {
                padding-bottom: 0;
            }
            .home-content br {
                display: none;
            }
            .home-content__main {
                max-width: 700px;
            }
            .home-content__text {
                width: 100% !important;
                float: none !important;
                clear: both !important;
                margin-left: 0;
                margin-right: 0;
            }
            .home-content__text {
                padding-right: 60px;
                margin-bottom: 7.2rem;
            }
            .home-content__line {
                display: none;
            }
        }
        @media only screen and (max-width:700px) {
            .home-content h1 {
                font-size: 4rem;
            }
            .home-content__main {
                max-width: 490px;
            }
        }
        @media only screen and (max-width:600px) {
            .home-content h3 {
                font-size: 1.3rem;
            }
            .home-content h1 {
                font-size: 3.6rem;
            }
            .home-content__text {
                padding-right: 10px;
            }
        }
        @media only screen and (max-width:500px) {
            .s-home {
                min-height: 642px;
                text-align: center;
            }
            .home-content h3 {
                padding-left: 0;
            }
            .home-content h3::before {
                display: none;
            }
            .home-content h1 {
                font-size: 3.3rem;
            }
            .home-content__main {
                max-width: 420px;
            }
        }
        @media only screen and (max-width:400px) {
            .s-home {
                min-height: 630px;
            }
            .home-logo {
                right: 30px;
            }
            .home-logo img {
                width: 95px;
                height: 24px;
            }
            .home-content h1 {
                font-size: 3rem;
            }
            .home-content__main {
                max-width: auto;
            }
            .home-content__text {
                padding-right: 0;
            }
        }
    </style>
</head>

<body>
    <main class="s-home s-home--static">
        <div class="overlay"></div>
        <div class="home-content">
            <div class="home-logo">
                <a href="https://anonjobs.io/">AnonJobs.io</a>
            </div>
            <div class="row home-content__main">
                <div class="col-eight home-content__text pull-right">
                    <h3>Welcome to AnonJobs</h3>
                    <h1>Web3, Blockchain, <br>  Smart Contract, <br> Crypto and Jobs.</h1>
                </div>
            </div>
            <div class="home-content__line">
            </div>
        </div>
    </main>
</body>

</html>
