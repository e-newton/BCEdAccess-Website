import grapesjs from 'grapesjs';
export default grapesjs.plugins.add('bootstrap-fixed-columns', (editor, options) => {
  editor.BlockManager.add('bs-col-1', {
    category: 'Fixed Sized Columns',
    label: 'Column-1',
    draggable: true,
    droppable: true,
    content: '<div class="col col-1" >Column</div>',
    render: ({ model, className }) => 'Column-1<h1>1</h1>'

  });
  editor.BlockManager.add('bs-col-2', {
    category: 'Fixed Sized Columns',
    label: 'Column-2',
    draggable: true,
    droppable: true,
    content: '<div class="col col-2" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-2<h1>2</h1>'


  });
  editor.BlockManager.add('bs-col-3', {
    category: 'Fixed Sized Columns',
    label: 'Column-3',
    draggable: true,
    droppable: true,
    content: '<div class="col col-3" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-3<h1>3</h1>'

  });
  editor.BlockManager.add('bs-col-4', {
    category: 'Fixed Sized Columns',
    label: 'Column-4',
    draggable: true,
    droppable: true,
    content: '<div class="col col-4" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-4<h1>4</h1>'

  });
  editor.BlockManager.add('bs-col-5', {
    category: 'Fixed Sized Columns',
    label: 'Column-5',
    draggable: true,
    droppable: true,
    content: '<div class="col col-5" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-5<h1>5</h1>'

  });
  editor.BlockManager.add('bs-col-6', {
    category: 'Fixed Sized Columns',
    label: 'Column-6',
    draggable: true,
    droppable: true,
    content: '<div class="col col-6" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-6<h1>6</h1>'

  });
  editor.BlockManager.add('bs-col-7', {
    category: 'Fixed Sized Columns',
    label: 'Column-7',
    draggable: true,
    droppable: true,
    content: '<div class="col col-7" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-7<h1>7</h1>'

  });
  editor.BlockManager.add('bs-col-8', {
    category: 'Fixed Sized Columns',
    label: 'Column-8',
    draggable: true,
    droppable: true,
    content: '<div class="col col-8" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-8<h1>8</h1>'

  });
  editor.BlockManager.add('bs-col-9', {
    category: 'Fixed Sized Columns',
    label: 'Column-9',
    draggable: true,
    droppable: true,
    content: '<div class="col col-9" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-9<h1>9</h1>'

  });
  editor.BlockManager.add('bs-col-10', {
    category: 'Fixed Sized Columns',
    label: 'Column-10',
    draggable: true,
    droppable: true,
    content: '<div class="col col-10" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-10<h1>10</h1>'

  });
  editor.BlockManager.add('bs-col-11', {
    category: 'Fixed Sized Columns',
    label: 'Column-11',
    draggable: true,
    droppable: true,
    content: '<div class="col col-11" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-11<h1>11</h1>'

  });
  editor.BlockManager.add('bs-col-12', {
    category: 'Fixed Sized Columns',
    label: 'Column-12',
    draggable: true,
    droppable: true,
    content: '<div class="col col-12" ><p>Column</p></div>',
    render: ({ model, className }) => 'Column-12<h1>12</h1>'

  });

})
