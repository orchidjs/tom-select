import TomSelect from './tom-select.js';
import change_listener from './plugins/change_listener/plugin.js';
import drag_drop from './plugins/drag_drop/plugin.js';
import dropdown_header from './plugins/dropdown_header/plugin.js';
import input_autogrow from './plugins/input_autogrow/plugin.js';
import no_backspace_delete from './plugins/no_backspace_delete/plugin.js';
import optgroup_columns from './plugins/optgroup_columns/plugin.js';
import remove_button from './plugins/remove_button/plugin.js';
import restore_on_backspace from './plugins/restore_on_backspace/plugin.js';


TomSelect.define('change_listener',change_listener );
TomSelect.define('drag_drop',drag_drop );
TomSelect.define('dropdown_header', dropdown_header );
TomSelect.define('input_autogrow', input_autogrow );
TomSelect.define('no_backspace_delete', no_backspace_delete );
TomSelect.define('optgroup_columns', optgroup_columns );
TomSelect.define('remove_button', remove_button );
TomSelect.define('restore_on_backspace', restore_on_backspace );


export default TomSelect;
