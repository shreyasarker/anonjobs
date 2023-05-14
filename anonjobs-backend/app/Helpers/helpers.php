<?php

function createSlug($text)
{
    return str_replace(' ', '-', strtolower($text));
}

function isEmail($value)
{
    if (filter_var($value, FILTER_VALIDATE_EMAIL)) {
        return true;
    }
    return false;
}

function isUrl($value)
{
    if (filter_var($value, FILTER_VALIDATE_URL)) {
        return true;
    }
    return false;
}
