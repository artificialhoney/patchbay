const
    inShader=op.inObject("Shader"),
    inDefineName=op.inString("Name"),
    inDefineValue=op.inString("Value"),
    inActive=op.inValueBool("Active")
    ;


inShader.onChange=
    inDefineName.onChange=
    inDefineValue.onChange=
    inActive.onChange=update;
update();

function update()
{
    var shader=inShader.get();
    if(!shader)
    {
        return;
    }

    if(!inActive.get()) shader.removeDefine(inDefineName.get());
        else  shader.define(inDefineName.get(),inDefineValue.get());

}