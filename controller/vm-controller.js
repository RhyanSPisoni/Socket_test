const mssql = require('../mssql');

exports.postVM = async (req, res, next) => {
  try {
    var query = 'INSERT INTO virtual_machine (ds_address, fl_status, ds_abbr) values (?1,?2,?3)';
    query = query
      .replace('?1', `'${req.body.ds_address}'`)
      .replace('?2', `'${req.body.fl_status}'`)
      .replace('?3', `'${req.body.ds_abbr}'`)
    await mssql.execute(query);
    return res.status(201).send();
  } catch (error) {
    console.log(error)
    return res.status(200).send({ message: error.message });
  }
};

exports.getVM = async (req, res, next) => {
  try {
    var query = 'SELECT * FROM virtual_machine';
    await mssql.execute(query);
    return res.status(201).send();
  } catch (error) {
    console.log(error)
    return res.status(200).send({ message: error.message });
  }
};

exports.patchVM = async (req, res, next) => {
  try {
    var query = 'Update virtual_machine set ds_address = ?1, fl_status = ?2, ds_abbr = ?3 where id_vm = ?';
    query = query
      .replace('?1', `'${req.body.ds_address}'`)
      .replace('?2', `'${req.body.fl_status}'`)
      .replace('?3', `'${req.body.ds_abbr}'`)
      .replace('?', `'${req.body.id_vm}'`)
    await mssql.execute(query);
    return res.status(201).send();
  } catch (error) {
    console.log(error)
    return res.status(200).send({ message: error.message });
  }
};

///////////////////////////////////////////////////////////

exports.patchFlVM = async (req, res, next) => {
  try {
    var query = 'Update virtual_machine set fl_status = ?1 where id_vm = ?2';
    query = query
      .replace('?1', `'${req.body.fl_status}'`)
      .replace('?2', `'${req.body.id_vm}'`)
    await mssql.execute(query);
    return res.status(201).send();
  } catch (error) {
    console.log(error)
    return res.status(200).send({ message: error.message });
  }
};

///////////////////////////////////////////////////////////

exports.deleteVM = async (req, res, next) => {
  console.log("A");
  try {
    var query = 'Delete from virtual_machine where id_vm = ?1';
    query = query
      .replace('?1', `'${req.body.id_vm}'`)
    await mssql.execute(query);
    return res.status(201).send();
  } catch (error) {
    console.log(error)
    return res.status(200).send({ message: error.message });
  }
};