// this op will send one trigger out if the threshold has been crossed
// but will not send another until the incoming inValue
// drops below the threshold and go's above it again

const inValue = op.inValue("Input"),
    inThreshold = op.inValue("Threshold"),
    output = op.outTrigger("Output");

let hasThresholdBeenExceeded = false;

inValue.onChange = update;
function update()
{
    if (!hasThresholdBeenExceeded && inValue.get() >= inThreshold.get())
    {
        hasThresholdBeenExceeded = true;
        output.trigger();
    }
    else if (hasThresholdBeenExceeded && inValue.get() <= inThreshold.get())
    {
        hasThresholdBeenExceeded = false;
    }
}
