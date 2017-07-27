define(['jquery', 'underscore', 'backbone'], function ($, _, backbone){

    function SetUpdatedMap(img) {
        var imageMap = document.getElementById("AppsMap");
        if (img.currentSrc.includes("download-tablet-landscape.png")) {
            imageMap.areas[0].coords = "78,76,170,105";
            imageMap.areas[1].coords = "178,74,276,102";
        }
        if (img.currentSrc.includes("download-mobile.png")) {
            imageMap.areas[0].coords = "161,54,235,78";
            imageMap.areas[1].coords = "241,54,319,79";
        }
        if (img.currentSrc.includes("download-tablet-portrait.png")) {
            imageMap.areas[0].coords = "22,82,85,100";
            imageMap.areas[1].coords = "96,81,160,101";
        }
    }
});