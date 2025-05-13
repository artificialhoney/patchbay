'use strict';

const StandaloneElectron = class
{
    constructor(op)
    {
        this.hello = "world";

        op.isElectron = () =>
        {
            return CABLES.platform.frontendOptions.isElectron;
        };
    }
};

CABLES.StandaloneElectron = StandaloneElectron;
//# sourceMappingURL=standalone_electron.js.map
