const salaModel = require("../models/salaModel")

exports.get=async()=>{
    return salaModel.listarSalas();
}