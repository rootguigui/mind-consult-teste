const Course = require('../models/Course');
const fs = require('fs');
const path = require('path');

class CourseController {
  async courses(req, res) {
    const { search } = req.query;
    const courses = await Course.find({
      $or: [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });
    return res.send({ error: false, data: { courses }, message: 'cursos listados com sucesso' });
  }

  async getById(req, res) {
    const course = await Course.findById(req.params.id);
    return res.send({ error: false, data: { course }, message: 'curso encontrado com sucesso' });
  }

  async create(req, res) {
    try {

      if (!req.file) return res.status(400).send({ error: true, data: null, message: 'Selecione um arquivo para upload!' });

      const { name, category, description, author } = req.body;

      const course = new Course({ name, category, description, author, image: req.fileName });
  
      const result = await course.save();
  
      return res.send({ error: false, data: { course: result }, message: 'Curso cadastrado com sucesso!' });
    }
    catch(ex) {
      return res.status(500).send({ error: true, data: null, message: ex.message })
    }
  }

  async delete(req, res) {
    const course = await Course.findByIdAndDelete(req.params.id);

    if (course == null) return res.status(404).send({ error: true, data: null, message: 'Curso não encontrado' });
    
    return res.status(200).send({ error: false, data: { course }, message: 'Curso deletado com sucesso!' })
  }

  async update(req, res) {
    try {
      const { _id, name, description, category, author } = req.body;

      let course = await Course.findById(_id);

      if (course == null) return res.status(404).send({ data: null, error: true, message: 'Curso não existe' })

      const pathFile = path.join(__dirname, '..', '..', 'uploads', course.image);
      fs.unlinkSync(pathFile);

      course.name = name;
      course.description = description;
      course.category = category;
      course.author = author;
      course.image = req.fileName;
      
      const newCourse = await course.save();
  
      return res.status(200).send({ error: false, data: { course: newCourse }, message: 'Curso atualizado com sucesso!' });
    }
    catch(ex) {
      return res.status(400).send({ error: true, data: null, message: ex.message })
    }
  }
}

module.exports.CourseController = new CourseController();