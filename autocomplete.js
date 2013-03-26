AutoComplete = {
  SPACER: 32,  
  COMPLETOR: 9,
  CANDIDATES: ['foo','bar','nga','qux', 'quux'],

  findCandidate: function(last) {
    var matched = $.grep(AutoComplete.CANDIDATES, function(e, i){ return e.match(last); });

    return matched.length > 0 ?  matched[matched.indexOf(last) + 1] : last;
  },

  keydown: function(e) {
    if(e.which == AutoComplete.COMPLETOR) {
      e.preventDefault();
      AutoComplete.autocomplete(this);
    }
  },

  autocomplete: function(target) {
    var candidate = AutoComplete.findInput(target.value, target.selectionStart);
    var completion = AutoComplete.findCandidate(candidate);
    target.value = target.value.replace(candidate, completion);
  },

  findInput: function(text, position) {
    var reversedCandidate = text.slice(0, position).split('').reverse();

    var spacerIndex = reversedCandidate.indexOf(AutoComplete.SPACER);
    spacerIndex = spacerIndex != -1 ? spacerIndex : reversedCandidate.length;

    return reversedCandidate.slice(0, spacerIndex).reverse().join('');
  }
}
