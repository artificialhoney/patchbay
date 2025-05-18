const
    isMobile = op.outValue("Is Mobile", false),
    isIe = op.outValue("Is IE", false),
    isIe10Plus = op.outValue("Is IE 10+", false),
    isIe11 = op.outValue("Is IE 11", false),
    isEdge = op.outValue("Is Edge", false),
    isChrome = op.outValue("Is Chrome", false),
    isFirefox = op.outValue("Is Firefox", false),
    isSafari = op.outValue("Is Safari", false),
    isWindows = op.outValue("Is Windows", false),
    isLinux = op.outValue("Is Linux", false),
    isMac = op.outValue("Is Mac", false),
    isIos = op.outValue("Is iOS", false),
    isAndroid = op.outValue("Is Android", false),
    isElectron = op.outBool("Is Electron", false),
    outNav = op.outString("Language");

outNav.set(navigator.language || navigator.userLanguage);

isFirefox.set(!!navigator.userAgent.search("Firefox"));

if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
{
    isSafari.set(true);
}

const userAgent = navigator.userAgent.toLowerCase();
isElectron.set(userAgent.indexOf(" electron/") > -1);

if (/MSIE 10/i.test(navigator.userAgent) || /MSIE 9/i.test(navigator.userAgent) || /rv:11.0/i.test(navigator.userAgent))
{
    isIe.set(true);
    isFirefox.set(false);
    if (/MSIE 9/i.test(navigator.userAgent))
    {
        isIe10Plus.set(false);
        isIe11.set(false);
    }
    else if (/MSIE 10/i.test(navigator.userAgent))
    {
        isIe10Plus.set(true);
        isIe11.set(false);
    }
    else if (/rv:11.0/i.test(navigator.userAgent))
    {
        isIe10Plus.set(false);
        isIe11.set(true);
    }
}

if (/Edge\/\d./i.test(navigator.userAgent))
{
    isEdge.set(true);
    isFirefox.set(false);
}

const isChromium = window.chrome,
    winNav = window.navigator,
    vendorName = winNav.vendor,
    isOpera = winNav.userAgent.indexOf("OPR") > -1,
    isIEedge = winNav.userAgent.indexOf("Edge") > -1,
    isIOSChrome = winNav.userAgent.match("CriOS");

if (isIOSChrome || (isChromium !== null && isChromium !== undefined && vendorName === "Google Inc." && isOpera === false && isIEedge === false))
{
    // is Google Chrome
    isChrome.set(true);
    isFirefox.set(false);
}
else
{
    // not Google Chrome
}

if (window.navigator.userAgent.indexOf("Windows") != -1)
{
    isWindows.set(true);
}

if (window.navigator.userAgent.indexOf("Linux") != -1)
{
    isWindows.set(false);
    isLinux.set(true);
}

if (window.navigator.userAgent.indexOf("Mac") != -1)
{
    isWindows.set(false);
    isMac.set(true);
}

isIos.set(/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream);

if (window.navigator.userAgent.toLowerCase().indexOf("android") != -1)
    isAndroid.set(true);

isMobile.set(false);
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    isMobile.set(true);
