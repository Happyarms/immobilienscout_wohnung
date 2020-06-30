// ==UserScript==
// @name         Immobilienscout Wohnungssuche
// @namespace    http://tampermonkey.net/
// @version      0.8.2
// @author       You
// @match        https://www.immobilienscout24.de/Suche/*/wohnung-mieten*
// @updateURL    https://raw.githubusercontent.com/Happyarms/immobilienscout_wohnung/master/user.js
// @downloadURL  https://raw.githubusercontent.com/Happyarms/immobilienscout_wohnung/master/user.js
// @description  try to take over the world!
// @author       Dennis Gloger
// @grant        none
// @run-at document-end
// ==/UserScript==

function custom_filter(){
    var energiewert = '123';
    var preis = '123';
    var preis2 = '123';
    var gesamtpreis = '123';
    var quadradmeter = '123';
    var entfernungskosten = '123';
    var content = '';
    $('.result-list-entry__data > a').each(function(blubb,e){

       $.get($(this).attr('href'), function(data, status){
           preis = $(e).parent().children().children().children().children('.result-list-entry__primary-criterion:first').children('dd');
           preis2 = preis.text().replace('€','').replace('.','');

           quadradmeter = $(e).parent().children().children().children().children('.result-list-entry__primary-criterion:nth-child(2)').children('dd').text();

           if($(data).find('.is24qa-gesamtmiete').length > 0){
               energiewert = $(data).find('.is24qa-gesamtmiete').text();
           }else{
               energiewert = '150';
           }
           $(preis).parent().parent().prepend('<div style=";width: 100%;"></div>');
           $(preis).parent().parent().prepend('<dl class="grid-item result-list-entry__primary-criterion gt3" role="presentation"><dd class="font-nowrap font-line-xs">'+parseInt(energiewert)+'</dd><dt class="font-s onlyLarge">Warmmiete</dt></dl>');

           //energiewert = energiewert.replace(' kWh/(m²*a)','')
           //preis2 = parseInt(preis2) + parseInt(energiewert);


           entfernungskosten = $(e).next().children('div:first').text().replace(' km|','');
           entfernungskosten = (parseFloat(entfernungskosten) * 40) * 0.3;
           //
           $(preis).parent().parent().prepend('<dl class="grid-item result-list-entry__primary-criterion gt3" role="presentation"><dd class="font-nowrap font-line-xs">'+parseInt(entfernungskosten)+'</dd><dt class="font-s onlyLarge">Fahrkosten</dt></dl>');
           //$(preis).append('<br />Farkost.: '+ parseInt(entfernungskosten));
           //
           entfernungskosten = parseFloat(entfernungskosten) + parseInt(energiewert);
           //
           $(preis).parent().parent().append('<div style=";width: 100%;"></div>');
           $(preis).parent().parent().append('<dl class="grid-item result-list-entry__primary-criterion gt3" role="presentation"><dd class="font-nowrap font-line-xs">'+parseInt(entfernungskosten)+'</dd><dt class="font-s onlyLarge">Gesamt</dt></dl>');
           //$(preis).append('<br />Gesamt.: '+ entfernungskosten);
           //
           if(parseInt(entfernungskosten) > 1200){
               //$(e).parent().parent().parent().parent().parent().parent().fadeOut(2000);
           }
       });
            //energiewert
        //$(preis).append('Test');
        //$(this).append(energiewert);
    });
};

$( document ).ready(function() {
    custom_filter();
});
