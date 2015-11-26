import { errorize } from '../../../utils/errorize';
import { module, test } from 'qunit';

module('Unit | Utility | errorize');

test('errorize', function(assert) {
  var errors = {
    responseJSON: {
      errors:[
        {
          code:100,
          title:'has already been taken',
          detail:'Email has already been taken',
          source:{
            pointer:'/data/attributes/email',
          },
        },
        {
          code:100,
          title:'is too short (minimum is 6 characters)',
          detail:'Password is too short (minimum is 6 characters)',
          source:{
            pointer:'/data/attributes/password',
          },
        },
     ],
    },
  };

  var expected = {
    email: [
      {message: 'Email has already been taken'},
    ],
    password: [
      {message: 'Password is too short (minimum is 6 characters)'},
    ],
  };

  assert.deepEqual(errorize(errors), expected, 'errorize should equal errors');
});
