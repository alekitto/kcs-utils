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

