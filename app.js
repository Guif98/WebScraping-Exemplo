var app = require('express')();
const axios = require('axios');
const cheerio = require('cheerio');
const url = 'https://globoesporte.globo.com/rj/futebol/campeonato-carioca/';

var bodyParser = require("body-parser");


//Set view engine to ejs

app.set("view engine", "ejs");

//Tell Express where we keep our index.ejs
app.set("views", __dirname + "/views");

//Use body-parser

app.use(bodyParser.urlencoded({extended: false}));



axios(url).then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const tabelaStatus = $('.ranking-item-wrapper');
    var tabelaJogador = [];


tabelaStatus.each(function() {
    const nomeJogador = $(this).find('.jogador-nome').text();
    const posicaoJogador = $(this).find('.jogador-posicao').text();
    const numeroGols = $(this).find('.jogador-gols').text();
    const timeJogador = $(this).find('.jogador-escudo > img').attr('alt');
    
    tabelaJogador.push({
        nomeJogador,
        posicaoJogador,
        numeroGols,
        timeJogador
    }); 
});




//Instead of sending Hello World, we render index.ejs

console.log(tabelaJogador);

let jogador = Array();

for (let i = 0; i < tabelaJogador.length; i++) {
    let jogador = tabelaJogador[i];
    console.log(jogador.nomeJogador);
}


app.get("/", (req, res) => {res.render("index", {
    jogador: tabelaJogador
});});
app.listen(8080, () => {console.log("Server online on http://localhost:8080");});

});
