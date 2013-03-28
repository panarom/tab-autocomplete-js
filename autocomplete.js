AutoComplete = {
  SPACER: 32,  
  COMPLETOR: 9,
  CANDIDATES: ['foo','bar','nga','qux', 'quux'],

  findCandidate: function(candidate) {
    var regexp = new RegExp('^' + (candidate[0].length > 0 ? candidate[0] : candidate[1]));
    var matched = $.grep(AutoComplete.CANDIDATES, function(e, i){ return e.match(regexp); });

    return matched.length > 0 ?  matched[matched.indexOf(candidate[1]) + 1] : candidate[1];
  },

  keydown: function(e) {
    if(e.which == AutoComplete.COMPLETOR) {
      e.preventDefault();
      AutoComplete.autocomplete(this);
    }
  },

  autocomplete: function(target) {
    var start = target.selectionStart;
    var candidate = AutoComplete.findInput(target);
    var completion = AutoComplete.findCandidate(candidate);

    target.value = target.value.replace(candidate[1], completion);
    target.selectionStart = start;
  },

  findInput: function(target) {
    var reversedCandidate = target.value.slice(0, target.selectionEnd).split('').reverse();

    var spacerIndex = reversedCandidate.indexOf(String.fromCharCode(AutoComplete.SPACER));
    spacerIndex = spacerIndex != -1 ? spacerIndex : reversedCandidate.length;

    var candidate = reversedCandidate.slice(0, spacerIndex).reverse();

    var selectedLength = target.selectionStart - target.selectionEnd;
    var prefix = candidate.slice(0, selectedLength).join('');

    return [prefix, candidate.join('')];
  }
}
