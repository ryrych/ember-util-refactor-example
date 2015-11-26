import Ember from 'ember';

export function errorize(errors) {
  var data = {};
  errors = errors.responseJSON.errors;

  errors.forEach((error)=> {
    if (error.source) {
      let field = error.source.pointer.split('/').pop().camelize();

      if (Ember.isNone(data[field])) {
        data[field] = [];
      }

      data[field].push({message: error.detail});
    }
  });
  return data;
}
