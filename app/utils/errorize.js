import Ember from 'ember';

var errorize = Ember.Object.extend({
  init() {
    this._super();
    this.set('errorsList', {});
  },

  validObject() {
    return !!this.get('errors');
  },

  buildErrorMessage(error) {
    let field = this.getErrorField(error);
    let message = error.detail;
    this.addErrorMessage(field, message);
  },

  getErrorField(error) {
    // { source: { pointer:'/data/attributes/email' } }
    return (/\w+$/.exec(error.source.pointer))[0].camelize();
  },

  addErrorMessage(field, message) {
      (this.get('errorsList')[field] = this.get('errorsList')[field] || [])
      .push({message});
  },

  serialize() {
    if (!this.validObject()) {
      return {};
    }
    this.get('errors.responseJSON.errors').forEach(error => this.buildErrorMessage(error));
    return this.get('errorsList');
  },
});

export default errorize;
