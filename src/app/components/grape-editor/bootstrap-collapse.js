import grapesjs from 'grapesjs';
function generateID(length = 6) {
  let result           = '';
  const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
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

  domComps.addType('collapse-card', {
    model: defaultModel.extend({
      init(){
        console.log('YA BITCH')
        const id = generateID();
        const parent = this.parent();
        console.log('PARENT', parent);
        this.components().add(`<div class="card">
                                  <div class="card-header" id="headingOne">
                                    <h2 class="mb-0">
                                      <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#${id}" aria-expanded="true" aria-controls="${id}">
                                        Collapsible Group Item #1
                                      </button>
                                    </h2>
                                  </div>

                                  <div id="${id}" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                                    <div class="card-body">
                                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                                    </div>
                                  </div>
                                </div>`)
      }
    }, {
      isComponent(el) {
        if (el.tagName === 'COLLAPSE-CARD') {
          return {type: 'collapse-card'}
        }
      },
    }),
    view: defaultView
  })
  editor.BlockManager.add('comp-test', {
    label: "Comp Test",
    category: 'fuc',
    content: '<div class="accordion" id="accordionExample">' +
      '<collapse-card></collapse-card>'+
      '</div>'
  })
});
