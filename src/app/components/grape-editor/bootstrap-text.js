import grapesjs from 'grapesjs';
export default grapesjs.plugins.add('bootstrap-text', (editor, options) => {
  editor.BlockManager.add('h-1', {
    category: 'Typography',
    label: 'H1',
    draggable: true,
    droppable: true,
    content: '<h1>Heading 1</h1>',
    render: ({model, className}) => '<h1>H1</h1>'
  });
  editor.BlockManager.add('h-2', {
    category: 'Typography',
    label: 'H2',
    draggable: true,
    droppable: true,
    content: '<h2>Heading 2</h2>',
    render: ({model, className}) => '<h2>H2</h2>'
  });
  editor.BlockManager.add('h-2', {
    category: 'Typography',
    label: 'H2',
    draggable: true,
    droppable: true,
    content: '<h2>Heading 2</h2>',
    render: ({model, className}) => '<h2>H2</h2>'
  });
  editor.BlockManager.add('h-3', {
    category: 'Typography',
    label: 'H3',
    draggable: true,
    droppable: true,
    content: '<h3>Heading 3</h3>',
    render: ({model, className}) => '<h3>H3</h3>'
  });
  editor.BlockManager.add('h-4', {
    category: 'Typography',
    label: 'H4',
    draggable: true,
    droppable: true,
    content: '<h4>Heading 4</h4>',
    render: ({model, className}) => '<h4>H4</h4>'
  });
  editor.BlockManager.add('h-5', {
    category: 'Typography',
    label: 'H5',
    draggable: true,
    droppable: true,
    content: '<h5>Heading 5</h5>',
    render: ({model, className}) => '<h5>H5</h5>'
  });
  editor.BlockManager.add('h-6', {
    category: 'Typography',
    label: 'H6',
    draggable: true,
    droppable: true,
    content: '<h6>Heading 6</h6>',
    render: ({model, className}) => '<h6>H6</h6>'
  });


});
