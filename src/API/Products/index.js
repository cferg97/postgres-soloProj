import express from 'express'
import createHttpError from 'http-errors'
import { Op } from 'sequelize'
import productsModel from './model.js'

const productsRouter = express.Router()

