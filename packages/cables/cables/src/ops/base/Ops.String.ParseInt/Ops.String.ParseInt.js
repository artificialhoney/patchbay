
var str=op.inValueString("String");
var outNum=op.outValue("Number");

str.onChange=function()
{
    var num=parseInt(str.get());
    if(num!=num) num=0;
    outNum.set(num);
};

