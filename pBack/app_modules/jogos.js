const express = require('express');

module.exports = (connection) => {
    const router = express.Router();

    router.get('/jogos/:id', (req, resp) => {
        let id_jogos = req.params.id;
    
        connection.query("SELECT j.nomejogo, d.local_encontro, d.conhecimento_necessario, d.data_jogo, j.horario, d.duracao_horas, d.qtdPlayers FROM jogos as j, detalhes as d WHERE idjogos = ? and d.iddetalhes = j.detalhes",
        [id_jogos],
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

    router.get('/jogos/nome/:id', (req, resp) => {
        let nome_jogos = req.params.id;
    
        connection.query("SELECT nomejogo, qtdplayers, d.data_jogo FROM jogos, detalhes as d WHERE idjogos = ? and d.iddetalhes = detalhes",
        [nome_jogos],
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
    
    router.post('/jogos', (req, resp) => {
        let jogos = req.body;
    
        if (jogos == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO jogos SET ?',
            [jogos], 
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
    
    router.put('/jogos/:id', (req, resp) => {
        let id_jogos = req.params.id;
        let jogos = req.body;    
    
        connection.query('UPDATE jogos SET ? WHERE idjogos = ?',
        [jogos, id_jogos], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/jogos/:id', (req, resp) => {
        let id_jogos = req.params.id;
    
        connection.query('DELETE FROM jogos WHERE idjogos = ?',
        [id_jogos], 
        (err, result) => {
    
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