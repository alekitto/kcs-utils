<?php

namespace Kcs\Utils;

function try_unserialize($serialized)
{
    $ex = null;
    set_error_handler(function () use (&$ex) {
        $ex = new Exception\UnserializeError(sprintf(
            'Unable to unserialize: %s',
            func_get_args()[1]
        ));
    });

    $unserialized = unserialize($serialized);
    restore_error_handler();

    if ($ex) {
        throw $ex;
    }

    return $unserialized;
}

function try_json_decode($json, $assoc = false, $depth = 512, $options = 0)
{
    json_encode([]); // Reset json_last_error
    $return = json_decode($json, $assoc, $depth, $options);

    if ($return === null) {
        $errCode = json_last_error();

        if ($errCode !== JSON_ERROR_NONE) {
            throw new Exception\JsonDecodeError(
                "Json decoding failed with message: " .
                json_last_error_msg() . " (#$errCode)"
            );
        }
    }
    return $return;
}

