import {test} from './util/helpers';

test('attribute selector', '[href]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].attribute, 'href');
    t.same(tree.nodes[0].nodes[0].type, 'attribute');
});

test('multiple attribute selectors', '[href][class][name]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].attribute, 'href');
    t.same(tree.nodes[0].nodes[1].attribute, 'class');
    t.same(tree.nodes[0].nodes[2].attribute, 'name');
});

test('attribute selector with a value', '[name=james]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].attribute, 'name');
    t.same(tree.nodes[0].nodes[0].operator, '=');
    t.same(tree.nodes[0].nodes[0].value, 'james');
});

test('attribute selector with quoted value', '[name="james"]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].attribute, 'name');
    t.same(tree.nodes[0].nodes[0].operator, '=');
    t.same(tree.nodes[0].nodes[0].value, '"james"');
});

test('attribute selector with escaped quote', '[title="Something \\"weird\\""]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].value, '"Something \\"weird\\""');
});

test('multiple attribute selectors + combinator', '[href][class][name] h1 > h2', (t, tree) => {
    t.same(tree.nodes[0].nodes[2].attribute, 'name');
    t.same(tree.nodes[0].nodes[3].value, ' ');
    t.same(tree.nodes[0].nodes[5].value, '>');
    t.same(tree.nodes[0].nodes[6].value, 'h2');
});

test('attribute, class, combinator', '[href] > h2.test', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].attribute, 'href');
    t.same(tree.nodes[0].nodes[1].value, '>');
    t.same(tree.nodes[0].nodes[2].value, 'h2');
    t.same(tree.nodes[0].nodes[3].value, 'test');
});

test('attribute selector with quoted value & combinator', '[name="james"] > h1', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].value, '"james"');
    t.same(tree.nodes[0].nodes[1].value, '>');
    t.same(tree.nodes[0].nodes[2].value, 'h1');
});

test('multiple quoted attribute selectors', '[href*="test.com"][rel="external"][id][class~="test"] > [name]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].attribute, 'href');
    t.same(tree.nodes[0].nodes[0].value, '"test.com"');
    t.same(tree.nodes[0].nodes[1].attribute, 'rel');
    t.same(tree.nodes[0].nodes[1].value, '"external"');
    t.same(tree.nodes[0].nodes[2].attribute, 'id');
    t.notOk(tree.nodes[0].nodes[2].value, 'should not have a value');
    t.same(tree.nodes[0].nodes[3].attribute, 'class');
    t.same(tree.nodes[0].nodes[3].value, '"test"');
    t.same(tree.nodes[0].nodes[4].value, '>');
    t.same(tree.nodes[0].nodes[5].attribute, 'name');
    t.notOk(tree.nodes[0].nodes[5].value, 'should not have a value');
});

test('more attribute operators', '[href*=test],[href^=test],[href$=test],[href|=test]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].operator, '*=');
    t.same(tree.nodes[1].nodes[0].operator, '^=');
    t.same(tree.nodes[2].nodes[0].operator, '$=');
    t.same(tree.nodes[3].nodes[0].operator, '|=');
});

test('spaces in attribute selectors', 'h1[  href  *=  "test"  ]', (t, tree) => {
    t.same(tree.nodes[0].nodes[1].attribute, '  href  ');
    t.same(tree.nodes[0].nodes[1].operator, '*=');
    t.same(tree.nodes[0].nodes[1].value, '  "test"  ');
});

test('insensitive attribute selector 1', '[href="test" i]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].value, '"test"');
    t.same(tree.nodes[0].nodes[0].insensitive, true);
});

test('insensitive attribute selector 2', '[href=TEsT i  ]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].value, 'TEsT');
    t.same(tree.nodes[0].nodes[0].raw.insensitive, ' i  ');
});

test('insensitive attribute selector 3', '[href=test i]', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].value, 'test');
    t.same(tree.nodes[0].nodes[0].insensitive, true);
});

test('extraneous non-combinating whitespace', '  [href]   ,  [class]   ', (t, tree) => {
    t.same(tree.nodes[0].nodes[0].attribute, 'href');
    t.same(tree.nodes[0].nodes[0].spaces.before, '  ');
    t.same(tree.nodes[0].nodes[0].spaces.after, '   ');
    t.same(tree.nodes[1].nodes[0].attribute, 'class');
    t.same(tree.nodes[1].nodes[0].spaces.before, '  ');
    t.same(tree.nodes[1].nodes[0].spaces.after, '   ');
});
