import Ember from 'ember';

var errorize = Ember.Object.extend({
  init() {
    this._super();
    this.set('errorsList', {});
  },

  passedErrorObject() {
    return !Ember.isNone(this.get('errors'));
  },

  buildErrorObjectFor(error) {
    let field = this.getErrorObjectField(error);
    let message = this.getErrorObjectMessage(error);
    this.addOrCreateErrorForField(field, message);
  },

  getErrorObjectField(error) {
    // { source: { pointer:'/data/attributes/email' } }
    return (/\w+$/.exec(error.source.pointer))[0].camelize();
  },

  getErrorObjectMessage(error) {
    return error.detail;
  },

  addOrCreateErrorForField(field, message) {
    if (Ember.isNone(this.get('errorsList')[field])) {
      this.get('errorsList')[field] = [{message}];
    } else {
      this.get('errorsList')[field].push({message});
    }
  },

  serialize() {
    if (!this.passedErrorObject()) {
      return {};
    }
    this.get('errors.responseJSON.errors').forEach(error => this.buildErrorObjectFor(error));
    return this.get('errorsList');
  },
});

export default errorize;
