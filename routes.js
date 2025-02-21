const express = require('express');
const router = express.Router();
const connection = require('./database');

// inserto datos de un huesped 
router.post('/huespedes', (req, res) => {
  const { cedula_huesped, nombre_huesped, apellido_huesped, telefono_huesped, ciudad_huesped, correo_huesped, id_habitacion, id_hotel } = req.body;
  
  const sql = 'INSERT INTO registro_huespedes (cedula_huesped, nombre_huesped, apellido_huesped, telefono_huesped, ciudad_huesped, correo_huesped, id_habitacion, id_hotel) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
  
  connection.query(sql, [cedula_huesped, nombre_huesped, apellido_huesped, telefono_huesped, ciudad_huesped, correo_huesped, id_habitacion, id_hotel], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error al agregar el huésped' });
    } else {
      res.status(201).json({ message: 'Huésped agregado correctamente', id: result.insertId });
    }
  });
});

// consultar datos del huesped 
router.get('/huespedes', (req, res) => {
  const sql = 'SELECT * FROM registro_huespedes';
  connection.query(sql, (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Error al obtener los huéspedes' });
    } else {
      res.json(results);
    }
  });
});

// Actualizar datos del huesped 
router.put('/huespedes/:id', (req, res) => {
  const { id } = req.params;
  const { cedula_huesped, nombre_huesped, apellido_huesped, telefono_huesped, ciudad_huesped, correo_huesped, id_habitacion, id_hotel } = req.body;
  
  const sql = 'UPDATE registro_huespedes SET cedula_huesped=?, nombre_huesped=?, apellido_huesped=?, telefono_huesped=?, ciudad_huesped=?, correo_huesped=?, id_habitacion=?, id_hotel=? WHERE id_huesped=?';

  connection.query(sql, [cedula_huesped, nombre_huesped, apellido_huesped, telefono_huesped, ciudad_huesped, correo_huesped, id_habitacion, id_hotel, id], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error al actualizar el huésped' });
    } else {
      res.json({ message: 'Se actualizo el huésped ' });
    }
  });
});

// Eliminar el huesped por Id
router.delete('/huespedes/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM registro_huespedes WHERE id_huesped=?';

  connection.query(sql, [id], (error, result) => {
    if (error) {
      res.status(500).json({ error: 'Error al eliminar el huésped' });
    } else {
      res.json({ message: 'Se elimino el registro del huésped' });
    }
  });
});

module.exports = router;
