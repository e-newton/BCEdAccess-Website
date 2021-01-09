import grapesjs from 'grapesjs';
export default grapesjs.plugins.add('bootstrap-responsive-columns', (editor, options) => {
  editor.BlockManager.add('bs-col-xs', {
    category: 'Responsive Columns',
    label: 'Column-XS',
    draggable: true,
    droppable: true,
    content: '<div class="col col-6 col-md-2 col-lg-1" data-gjs-draggable=".row">Extra Small Column</div>',
    render: ({ model, className }) => 'Column-XS<h1>XS</h1>'

  });
  editor.BlockManager.add('bs-col-sm', {
    category: 'Responsive Columns',
    label: 'Column-SM',
    draggable: true,
    droppable: true,
    content: '<div class="col col-8 col-md-4 col-lg-2" data-gjs-draggable=".row">Small Column</div>',
    render: ({ model, className }) => 'Column-SM<h1>SM</h1>'

  });
  editor.BlockManager.add('bs-col-md', {
    category: 'Responsive Columns',
    label: 'Column-MD',
    draggable: true,
    droppable: true,
    content: '<div class="col col-10 col-md-6 col-lg-4" data-gjs-draggable=".row">Medium Column</div>',
    render: ({ model, className }) => 'Column-MD<h1>MD</h1>'

  });
  editor.BlockManager.add('bs-col-lg', {
    category: 'Responsive Columns',
    label: 'Column-LG',
    draggable: true,
    droppable: true,
    content: '<div class="col col-12 col-md-12 col-lg-8" data-gjs-draggable=".row">Large Column</div>',
    render: ({ model, className }) => 'Column-LG<h1>LG</h1>'

  });
  editor.BlockManager.add('bs-col-xl', {
    category: 'Responsive Columns',
    label: 'Column-XL',
    draggable: true,
    droppable: true,
    content: '<div class="col col-12 col-md-12 col-lg-10" data-gjs-draggable=".row">Extra Large Column</div>',
    render: ({ model, className }) => 'Column-XL<h1>XL</h1>'

  });
  editor.BlockManager.add('bs-col-full', {
    category: 'Responsive Columns',
    label: 'Column-Full-Row',
    draggable: true,
    droppable: true,
    content: '<div class="col col-12 col-md-12 col-lg-12" data-gjs-draggable=".row">Full Row Column</div>',
    render: ({ model, className }) => 'Column-Full-Row<h1>XXL</h1>'

  });
  editor.BlockManager.add('bs-col-fill', {
    category: 'Responsive Columns',
    label: 'Column-Fill',
    draggable: true,
    droppable: true,
    content: '<div class="col" data-gjs-draggable=".row">Fill Column</div>',
    render: ({ model, className }) => 'Column-Fill<h1>F</h1>'

  });

})
