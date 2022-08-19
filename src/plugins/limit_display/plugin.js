/**
 * limit_display
 *
 * A custom Tom-Select plugin to limit the displayed selections in the control input.
 * To use, add the plugin like any other in the plugins list of the settings object.
 * The plugin takes one option setting: `limit` which must be an integer >= 1.
 * The default value for `limit` is 5.
 */
export default function(plugin_options)
{
    let self = this;

    let limit = plugin_options.limit ?? 5;
    if (limit < 1) limit = 5;

    /**
     * addEvent copied from tom-select plugins
     */
    const addEvent = (target, type, callback, options) => {
        target.addEventListener(type, callback, options);
    };

    const createCounterEl = (id, count) => {
        const counter = document.createElement('div');
        counter.id = id;
        counter.className = 'item';
        counter.textContent = count + ' items selected';

        return counter;
    }

    const updateDisplay = () => {
        const el = self.input;
        const counterElId = el.id + '_counter';
        let existingCounterEl = document.querySelector('#'+counterElId);
        if (self.items.length > limit) {
            self.control.querySelectorAll('.item').forEach(el => el.classList.add('d-none'));
            const newCounterEl = createCounterEl(counterElId, self.items.length);
            if (existingCounterEl) {
                self.control.replaceChild(newCounterEl, existingCounterEl);
            } else {
                self.control.append(newCounterEl);
            }
        } else {
            if (existingCounterEl) self.control.removeChild(existingCounterEl);
            self.control.querySelectorAll('.item').forEach(el => el.classList.remove('d-none'));
        }
    }

    self.on('initialize', () => {
        const control = self.control_input;

        updateDisplay();
        self.on('update item_add item_remove clear', updateDisplay);
        addEvent(control, 'input', updateDisplay);
        addEvent(control, 'keyup', updateDisplay);
        addEvent(control, 'blur', updateDisplay);
        addEvent(control, 'update', updateDisplay);
    });
}