<?php

namespace Kcs\Utils\Twig;

/**
 * @author Alessandro Chitolina <alekitto@gmail.com>
 */
class HostnameExtension extends \Twig_Extension
{
    public function getFunctions()
    {
        return array(
            new \Twig_SimpleFunction('hostname', 'gethostname')
        );
    }

    public function getName()
    {
        return 'kcs_hostname';
    }
}
