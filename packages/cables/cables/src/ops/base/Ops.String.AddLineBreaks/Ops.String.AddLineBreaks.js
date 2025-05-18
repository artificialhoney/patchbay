const
    inStr = op.inString("String", ""),
    inMaxLineChars = op.inInt("Max Characters per Line", 20),
    outStr = op.outString("Result");

inMaxLineChars.onChange =
    inStr.onChange = update;

function update()
{
    const str = inStr.get();
    if (!str)
    {
        outStr.set("");
        return;
    }

    const numChars = inMaxLineChars.get();
    const parts = str.split(" ");
    // const parts=str.split(/(?: |\n)/); // split at space or newline

    const lines = [];
    let line = "";
    for (let i = 0; i < parts.length; i++)
    {
        let word = parts[i] + " ";

        if (line.length + word.length > numChars)
        {
            lines.push(line);
            line = "";
        }

        line += word;
    }
    lines.push(line);
    outStr.set(lines.join("\n"));
}
