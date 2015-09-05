<?php

namespace Kcs\Utils;

function is_array_assoc(array $test)
{
    $array = array_keys($array);
    return ($array !== array_keys($array));
}

function object_to_array($object)
{
    if (is_object($object)) {
        $object = get_object_vars($object);
    }

    if (is_array($object)) {
        return array_map(__FUNCTION__, $object);
    }

    return $object;
}

function array_to_object($array)
{
    if (is_array($array)) {
        if (!is_array_assoc($array)) {
            // Don't convert to object
            return array_map(__FUNCTION__, $array);
        }

        return (object)array_map(__FUNCTION__, $array);
    }

    return $array;
}
