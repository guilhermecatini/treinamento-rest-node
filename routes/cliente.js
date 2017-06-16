const express  = require('express')
const router   = express.Router()
const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const _schema = {
	nome: String,
	sobrenome: String,
	email: String,
	idade: Number,
	telefone: String,
	cep: String,
	logradouro: String,
	complemento: String,
	bairro: String,
	localidade: String,
	uf: String,
	unidade: String,
	ibge: String,
	gia: String
}

const ClienteSchema = new Schema(_schema, { versionKey: false })
const ClienteModel = mongoose.model('cliente', ClienteSchema)

function callback(err, data, res) {
	if (err) return res.status(500).json(err)
		return res.status(200).json(data)
}

router.post('/novo', (req, res) => {
  const body = req.body
  ClienteModel.create(body, (err, data) => {
  	callback(err, data, res)
  })
})

router.post('/atualizar', (req, res) => {
  const query = { _id: req.body._id }
  const body  = req.body
  delete body._id
  ClienteModel.update(query, body, (err, data) => {
  	callback(err, data, res)
  })
})

router.get('/remover/:_id', (req, res) => {
  const query = { _id: req.params._id }
  ClienteModel.remove(query, (err, data) => {
  	callback(err, data, res)
  })
})

router.get('/listar', (req, res) => {
  ClienteModel.find({}, (err, data) => {
  	callback(err, data, res)
  })
})

router.get('/listar/:_id', (req, res) => {
	const query = { _id: req.params._id }
  ClienteModel.findOne(query, (err, data) => {
  	callback(err, data, res)
  })
})

module.exports = router
