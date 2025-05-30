const
    inUpdate = op.inTriggerButton("Update"),
    queryPort = op.inString("Query"),
    inMode = op.inValueSelect("Mode", ["document", "string input", "element"], "document"),
    inMimeType = op.inValueSelect("Type", ["text/html", "text/xml"], "text/html"),
    inSource = op.inStringEditor("Document", "xml"),
    inElement = op.inObject("Element", null, "element"),
    elementPort = op.outArray("Elements");

if (inMode.get() === "document")
{
    inSource.setUiAttribs({ "greyout": true });
    inMimeType.set("text/html");
    inMimeType.setUiAttribs({ "greyout": true });
}

inUpdate.onTriggered = update;
inMode.onChange = modeChange;

function update()
{
    op.setUiError("exc", null);
    const q = queryPort.get();
    const theDocument = inSource.get();
    const mode = inMode.get();
    if (mode === "string input" && theDocument)
    {
        let parser = new DOMParser();
        let htmlDoc = null;
        try
        {
            htmlDoc = parser.parseFromString(theDocument, inMimeType.get());
            const el = Array.from(htmlDoc.querySelectorAll(q));
            elementPort.set(el);
        }
        catch (e)
        {
            op.setUiError("exc", e.message, 1);
            op.logWarn(e);
        }
    }
    else if (mode === "document")
    {
        try
        {
            const el = Array.from(document.querySelectorAll(q));
            elementPort.set(el);
        }
        catch (e)
        {
            op.setUiError("exc", e.message, 1);
            op.logWarn(e);
        }
    }
    else
    {
        try
        {
            let el = null;
            if (inElement.get())
            {
                el = Array.from(inElement.get().querySelectorAll(q));
            }
            elementPort.set(el);
        }
        catch (e)
        {
            op.setUiError("exc", e.message, 1);
            op.logWarn(e);
        }
    }
}

function modeChange()
{
    if (inMode.get() === "document")
    {
        inSource.setUiAttribs({ "greyout": true });
        inMimeType.setUiAttribs({ "greyout": true });
        inElement.setUiAttribs({ "greyout": true });
    }
    else if (inMode.get() === "string input")
    {
        inSource.setUiAttribs({ "greyout": false });
        inMimeType.setUiAttribs({ "greyout": false });
        inElement.setUiAttribs({ "greyout": true });
    }
    else
    {
        inSource.setUiAttribs({ "greyout": true });
        inMimeType.setUiAttribs({ "greyout": true });
        inElement.setUiAttribs({ "greyout": false });
    }
}
