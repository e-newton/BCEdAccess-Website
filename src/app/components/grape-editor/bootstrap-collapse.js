import grapesjs from 'grapesjs';
function generateID(length = 6) {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  const charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
export default grapesjs.plugins.add('bootstrap-collapse', (editor, options) => {
  const domComps = editor.DomComponents;
  const bm = editor.BlockManager;
  const defaultType = domComps.getType('default');
  const defaultModel = defaultType.model;
  const defaultView = defaultType.view;

  const accordionComp = domComps.addType('collapse-card', {
    model: defaultModel.extend({
      init(){
        const id = generateID();
        const header_id = generateID()
        const parent = this.parent();
        this.components().add(`<div class="card">
                                  <div class="card-header" id="${header_id}" data-gjs-custom-name="Collapse Card Header">
                                    <h2 class="mb-0">
                                      <button class="btn btn-link" data-gjs-custom-name="Collapse Card Button" type="button" data-toggle="collapse" data-target="#${id}" aria-expanded="true" aria-controls="${id}">
                                        Collapsible Group Item
                                      </button>
                                    </h2>
                                  </div>

                                  <div id="${id}" class="collapse show" aria-labelledby="${header_id}" data-parent="#${parent.ccid}" data-gjs-custom-name="Collapse Card Body">
                                    <div class="card-body">
                                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </div>
                                  </div>
                                </div>`)
      },
    }, {
      isComponent(el) {
        if (el.tagName === 'COLLAPSE-CARD') {
          return {type: 'collapse-card'}
        }
      },
    }),
    view: defaultView
  })
  //domComps.addComponent('Accordion').set({type: 'collapse-card'}).addTrait({type: 'checkbox', name: 'open'});
  editor.BlockManager.add('Accordion', {
    label: "Bootstrap Components",
    category: 'Bootstrap Components',
    content: '<div class="accordion" data-gjs-custom-name="Accordion">' +
      '<collapse-card></collapse-card>' +
      '<collapse-card></collapse-card>' +
      '<collapse-card></collapse-card>'+
      '</div>'
    ,
    render: () => {
    return '<p>Accordion</p><img src="assets/accordion-menu.png" style="width: 100%; height: auto; filter: brightness(200%)">' +
      ''
  }
  })
  editor.BlockManager.add('Accordion-Card', {
    label: "Accordion Card",
    category: 'Bootstrap Components',
    droppable: '.accordion',
    draggable: '.accordion',
    content: '<collapse-card></collapse-card>',
    render: () => {
      return '<p>Accordion Card</p><img src="assets/accordion-menu.png" style="width: 100%; height: auto; filter: brightness(200%)">'
    }
  })
});
