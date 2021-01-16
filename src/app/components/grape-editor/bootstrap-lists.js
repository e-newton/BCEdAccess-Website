import grapesjs from 'grapesjs';
export default grapesjs.plugins.add('bootstrap-lists', (editor, options) => {
  editor.BlockManager.add('unordered-list', {
    category: 'Lists',
    label: 'Unordered List',
    draggable: true,
    droppable: true,
    content: '<ul>' +
      '<li>Item 1</li>' +
      '<li>Item 2</li>' +
      '<li>Item 3</li></ul>',
    render: ({model, className}) => 'Unordered List<h1>•</h1>'
  });
  editor.BlockManager.add('ordered-list', {
    category: 'Lists',
    label: 'Ordered List',
    draggable: true,
    droppable: true,
    content: '<ol>' +
      '<li>Item 1</li>' +
      '<li>Item 2</li>' +
      '<li>Item 3</li></ol>',
    render: ({model, className}) => 'Ordered List<h1>1)</h1>'
  });
  editor.BlockManager.add('list-element', {
    category: 'Lists',
    label: 'List Element',
    draggable: true,
    droppable: true,
    content: '<li>Item 1</li>',
    render: ({model, className}) => 'List Element<h1>•</h1>'
  });


});
