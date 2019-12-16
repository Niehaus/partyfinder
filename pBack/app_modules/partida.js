const express = require('express');

module.exports = (connection) => {
    const router = express.Router();
    //encontrar as partidas nas quais o jogador em questao esta cadastrado ou ja jogou
    router.get('/partidas/:id', (req, resp) => {
        let idJogador = req.params.id;

        connection.query("SELECT DISTINCT j.nomejogo, d.data_jogo FROM jogos as j, detalhes as d, partida as p"+
           "WHERE j.idjogos IN (SELECT idpartida FROM partida WHERE idpartida IN"+
            "(SELECT p.idpartida FROM partida as p, partidas_jogadores as pj"+ 
            "WHERE pj.jogadorId = ? AND p.idpartida = pj.partidasID)) and d.iddetalhes = j.detalhes",
        [idJogador],
        (err,result) => {
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {        
                resp.status(200);    
                resp.json(result);            
            }
        });
    });
    //detalhes sobre a partida em questao
    router.get('/partida/:id', (req, resp) => {
        let id_partida = req.params.id;

        connection.query("SELECT j.nomejogo, p.qtdJogadores, p.avaliacaoGeral FROM partida as p, jogos as j where p.idpartida = ? and j.idjogos = p.jogosId",
        [id_partida],
        (err, result) => {
            
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {        
                resp.status(200);    
                resp.json(result);            
            }
        });    
    });
    //adicionar uma partida nova
    router.post('/partida', (req, resp) => {
        let partida = req.body;
    
        if (partida == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO partida SET ?',
            [partida], 
            (err, result) => {
    
                if (err) {
                    console.log(err);
                    resp.status(500).end();
                } else {
                    resp.status(200);
                    resp.json(result);
                }
            });
        }    
    });
    
    router.put('/partida/:id', (req, resp) => {
        let id_partida = req.params.id;
        let partida = req.body;    

        connection.query('UPDATE partida SET ? WHERE idpartida = ?',
        [partida, id_partida], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/partida/:id', (req, resp) => {
        let id_partida = req.params.id;
    
        connection.query('DELETE FROM partida WHERE idpartida = ?',
        [id_partida], 
        (err, result) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });

    router.put('/partida/:id/avaliar', (req, resp) => {
        let id_partida = req.params.id;
        let avaliacao = req.query.avaliacao;
    
        connection.query('UPDATE partida SET avaliacaoGeral = ? WHERE idpartida = ?',
        [avaliacao,id_partida], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    return router;
}