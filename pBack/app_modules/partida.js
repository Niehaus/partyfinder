const express = require('express');

module.exports = (connection) => {
    const router = express.Router();

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
    /*
    router.post('/usuario', (req, resp) => {
        let usuario = req.body;
    
        if (usuario == null) {
            resp.status(204).end();
        } else {
            connection.query('INSERT INTO usuario SET ?',
            [usuario], 
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
    
    router.put('/usuario/:id', (req, resp) => {
        let id_usuario = req.params.id;
        let usuario = req.body;    
    
        connection.query('UPDATE usuario SET ? WHERE idUsuario = ?',
        [usuario, id_usuario], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
    
    router.delete('/usuario/:id', (req, resp) => {
        let id_usuario = req.params.id;
    
        connection.query('DELETE FROM usuario WHERE idUsuario = ?',
        [id_usuario], 
        (err, result) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });

    router.put('/usuario/:id/avaliar', (req, resp) => {
        let id_usuario = req.params.id;
        let avaliacao = req.query.avaliacao;
    
        connection.query('UPDATE usuario SET avaliacao = ? WHERE idUsuario = ?',
        [avaliacao,id_usuario], 
        (err, result ) => {
    
            if (err) {
                console.log(err);
                resp.status(500).end();
            } else {
                resp.status(200).end();
            }
        });
    });
*/
    return router;
}