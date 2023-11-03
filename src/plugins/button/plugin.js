/**
 * button
 *
 * A custom Tom-Select plugin to add optgroup buttons to the dropdown menu.
 * The button is rendered as 'Select <optGroup>'.
 * The button will select the optgroup options.
 *
 * To use, add the plugin like any other in the plugins list of the settings object.
 * The plugin takes one option setting: `buttons`:
 *  - the `buttons` setting must be an ARRAY of buttons.
 *  - the array items must be optgroup names in the select element.
 *  - additionally, pseudo-optgroups 'all' and 'none' may be used.
 *    - array items that contain commas will be rendered as a button-group
 *    - e.g. {buttons: ['all,none', 'public,private']}
 */
export default function(plugin_options)
{
    let self = this;

    /**
     * getDom and isHtmlString copied from tom-select plugins
     */
    const getDom = query => {
        if (query.jquery) {
            return query[0];
        }

        if (query instanceof HTMLElement) {
            return query;
        }

        if (isHtmlString(query)) {
            let div = document.createElement('div');
            div.innerHTML = query.trim(); // Never return a text node of whitespace as the result

            return div.firstChild;
        }

        return document.querySelector(query);
    };
    const isHtmlString = arg => {
        if (typeof arg === 'string' && arg.indexOf('<') > -1) {
            return true;
        }

        return false;
    };

    const getOptionValuesByOptGroupName = function(dropdownElement, groupName) {
        const header = Array.from(dropdownElement.querySelectorAll('.optgroup-header')).filter(function (node) {
            return groupName.toLowerCase() === node.textContent.toLowerCase();
        });
        const optGroup = header[0].parentElement;
        let values = [];
        optGroup.querySelectorAll('.option').forEach(option => values.push(option.dataset.value));

        return values;
    }

    const createButton = function(ctl, optGroup, innerHTML) {
        const button = document.createElement('button');
        button.type = "button";
        button.className = "btn btn-outline-success";
        button.innerHTML = innerHTML ?? 'Select ' + (optGroup ?? 'none');
        button.addEventListener('click', function () {
            ctl.clear();
            if (optGroup === 'all') {
                const values = [];
                ctl.dropdown_content.querySelectorAll('.option').forEach(option => values.push(option.dataset.value))
                ctl.addItems(values);
            } else if (optGroup && optGroup !== 'none') {
                ctl.addItems(getOptionValuesByOptGroupName(ctl.dropdown_content, optGroup));
            }
        });

        return button;
    }

    const createButtonGroup = function() {
        const buttonGroup = document.createElement('div');
        buttonGroup.className = "btn-group btn-group-sm group-selector pb-2";
        buttonGroup.ariaRoleDescription =  "group";

        return buttonGroup;
    }

    const createButtonLayout = function(optGroupSelectors) {
        const div = document.createElement('div');

        const cardDiv = document.createElement('div');
        cardDiv.className = "card card-body border-0";
        div.append(cardDiv);

        const buttonGroups = [];

        if (optGroupSelectors) {
            optGroupSelectors.forEach(function (selector) {
                const buttonGroup = createButtonGroup();
                if (selector.includes(',')) {
                    const selectors = selector.split(',');
                    selectors.forEach(function (optGroup) {
                        let button = createButton(self, optGroup.trim());
                        buttonGroup.append(button);
                    })
                } else {
                    let button = createButton(self, selector.trim());
                    buttonGroup.append(button);
                }
                buttonGroups.push(buttonGroup);
            });
        }

        cardDiv.append(...buttonGroups);

        return div;
    }

    self.hook('after', 'setupTemplates', () => {
        const orig_render_dropdown = self.settings.render.dropdown;
        self.settings.render.dropdown = (data, escape_html) => {
            const rendered = getDom(orig_render_dropdown.call(self, data, escape_html));
            const buttonLayout = createButtonLayout(plugin_options.buttons)

            rendered.append(buttonLayout);
            return rendered;
        }
    });
}