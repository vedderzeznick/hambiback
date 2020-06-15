const Usuarios = require ('../models/Usuarios');
/* 
// agrega nuevo paciente
exports.nuevoPaciente = async (req,res) => {
    const paciente = new Pacientes(req.body);

    try {
        // almacenar en registro
        await paciente.save();
        res.json({ mensaje: 'Se agrego un nuevo paciente'})
    } catch(error){
        console.log(error);
        next();
    }
}

//Muestra todos los pacientes
exports.mostrarPacientes = async (req, res, next) => {
    try {
        const pacientes = await Pacientes.find({});
        res.json(pacientes);
    } catch (error){
        console.log(error);
        next();
    }
}

// Muestra paciente por ID
exports.mostrarPaciente = async (req, res, next) => {
    const paciente = await Pacientes.findById(req.params.idPaciente);

    if(!paciente){
        res.json({mensaje: 'Ese paciente no existe'});
        next()
    }
    // Mostrar el paciente
    res.json(paciente);
}
 */
// Actualizar paciente por ID
exports.actualizarPaciente = async (req, res, next) => {
    try {
        let paciente = await Usuarios.findOne({ '_id': req.body._id });
        paciente.userAccount.paciente[req.body.campo] = req.body.descripcion;
        await Usuarios.findOneAndUpdate({ '_id': req.body._id },
            paciente, {
            new: true
        });
        res.json(paciente);
    } catch (error) {
        console.log(error);
        next();
    }
}
/* 
//Eliminar paciente por ID
exports.eliminarPaciente = async (req, res, next) => {
    try {
        await Pacientes.findOneAndDelete({_id : req.params.idPaciente});
        res.json({mensaje : 'El paciente se ha eliminado'});
    } catch(error){
        console.log(error);
        next();
    }
} */