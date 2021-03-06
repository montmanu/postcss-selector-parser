import {test} from './util/helpers';

test('pseudo element (single colon)', 'h1:after', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].type, 'tag');
    t.same(tree.nodes[0].nodes[1].type, 'pseudo');
    t.same(tree.nodes[0].nodes[1].value, ':after');
});

test('pseudo element (double colon)', 'h1::after', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].type, 'tag');
    t.same(tree.nodes[0].nodes[1].type, 'pseudo');
    t.same(tree.nodes[0].nodes[1].value, '::after');
});

test('multiple pseudo elements', '*:target::before, a:after', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].value, '*');
    t.same(tree.nodes[0].nodes[1].value, ':target');
    t.same(tree.nodes[0].nodes[2].value, '::before');
    t.same(tree.nodes[1].nodes[1].value, ':after');
});

test('negation pseudo element', 'h1:not(.heading)', (t, tree) => {
    t.same(tree.nodes[0].nodes[1].value, ':not');
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[0].value, 'heading');
});

test('negation pseudo element (2)', 'h1:not(.heading, .title, .content)', (t, tree) => {
    t.same(tree.nodes[0].nodes[1].value, ':not');
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[0].value, 'heading');
    t.same(tree.nodes[0].nodes[1].nodes[1].nodes[0].value, 'title');
    t.same(tree.nodes[0].nodes[1].nodes[2].nodes[0].value, 'content');
});

test('negation pseudo element (3)', 'h1:not(.heading > .title) > h1', (t, tree) => {
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[0].value, 'heading');
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[1].value, '>');
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[2].value, 'title');
    t.same(tree.nodes[0].nodes[2].value, '>');
    t.same(tree.nodes[0].nodes[3].value, 'h1');
});

test('negation pseudo element (4)', 'h1:not(h2:not(h3))', (t, tree) => {
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[1].nodes[0].nodes[0].value, 'h3');
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[1].nodes[0].nodes[0].parent.type, 'selector');
});

test('pseudo class in the middle of a selector', 'a:link.external', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].type, 'tag');
    t.same(tree.nodes[0].nodes[0].value, 'a');
    t.same(tree.nodes[0].nodes[1].type, 'pseudo');
    t.same(tree.nodes[0].nodes[1].value, ':link');
    t.same(tree.nodes[0].nodes[2].type, 'class');
    t.same(tree.nodes[0].nodes[2].value, 'external');
});

test('extra whitespace inside parentheses', 'a:not(   h2   )', (t, tree) => {
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[0].value, 'h2');
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[0].spaces.after, '   ');
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[0].spaces.before, '   ');
});

test('escaped numbers in class name with pseudo', 'a:before.\\31\\ 0', (t, tree) => {
    t.same(tree.nodes[0].nodes[2].type, 'class');
    t.same(tree.nodes[0].nodes[2].value, '\\31\\ 0');
});

test('nested pseudo', '.btn-group>.btn:last-child:not(:first-child)', (t, tree) => {
    t.same(tree.nodes[0].nodes[4].value, ':not');
});

test('extraneous non-combinating whitespace', '  h1:after   ,  h2:after   ', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].spaces.before, '  ');
    t.same(tree.nodes[0].nodes[1].value, ':after');
    t.same(tree.nodes[0].nodes[1].spaces.after, '   ');
    t.same(tree.nodes[0].nodes[0].spaces.before, '  ');
    t.same(tree.nodes[1].nodes[1].value, ':after');
    t.same(tree.nodes[1].nodes[1].spaces.after, '   ');
});

test('negation pseudo element with quotes', 'h1:not(".heading")', (t, tree) => {
    t.same(tree.nodes[0].nodes[1].value, ':not');
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[0].value, '".heading"');
});

test('negation pseudo element with single quotes', "h1:not('.heading')", (t, tree) => {
    t.same(tree.nodes[0].nodes[1].value, ':not');
    t.same(tree.nodes[0].nodes[1].nodes[0].nodes[0].value, "'.heading'");
});
