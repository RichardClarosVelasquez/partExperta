describe('ListCtrl', function() {

  var $controller;
  var ctrl;

  beforeEach(module('notesApp'));

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
    ctrl = $controller('ListCtrl');
  }));

    it('should exist', function() {
    expect(ctrl).toBeDefined();
    });

  it('should initialize with two items', function() {
    expect(ctrl.items.length).toBe(2);
  });

  it('should return finished class for done item', function() {
    var item = { done: true };
    var result = ctrl.getDoneClass(item);

    expect(result.finished).toBe(true);
    expect(result.unfinished).toBe(false);
  });

  it('should return unfinished class for not done item', function() {
    var item = { done: false };
    var result = ctrl.getDoneClass(item);

    expect(result.finished).toBe(false);
    expect(result.unfinished).toBe(true);
  });

});

