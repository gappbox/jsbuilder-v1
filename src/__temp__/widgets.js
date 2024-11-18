export const widgets = {
    "items": {
        "accordion": {
            "Id": "accordion",
            "Title": "WIDGET_ACCORDION",
            "Category": "CATEGORY_WIDGET",
            "Demo": true,
            "IsChecked": false,
            "Enable": true,
            "Installed": [],
            "Structure": {
                "ColumnsTitle": ['OPTIONS_GENERAL', 'OPTIONS_ADDITIONAL'],
                "Columns": [
                    [
                        "selector",
                        "items",
                        "opener",
                        "slider"
                    ],
                    [
                        "activeClass",
                        "animDuration",
                        "collapse",
                        "redirect",
                        "responsive"
                    ]
                ],
                "DefaultDisplay": [
                    "selector",
                    "items",
                    "opener"
                ]
            },
            "Options": {
                "selector": {
                    "label": "Selector block",
                    "value": ".accordion",
                    "type" : "text"
                },
                "items": {
                    "label": "Selector item",
                    "value": ".item",
                    "type" : "text"
                },
                "opener": {
                    "label": "Selector opener",
                    "value": ".opener",
                    "type" : "text"
                },
                "slider": {
                    "label": "Selector slider",
                    "value": ".slider",
                    "type" : "text"
                },
                "activeClass": {
                    "label": "Active class",
                    "value": "active",
                    "type" : "text"
                },
                "animDuration": {
                    "label": "Animate duration",
                    "value": 350,
                    "type" : "number",
                },
                "collapse": {
                    "label": "Collapsed",
                    "value": true,
                    "type" : "checkbox"
                },
                "redirect": {
                    "label": "Redirect to page",
                    "value": false,
                    "type" : "checkbox"
                },
                "responsive": {
                    "label": "Responsive range",
                    "value": '',
                    "type" : "text"
                }
            },
            "Callbacks": [
                {
                    "Name": "onInit",
                    "IsChecked": false,
                    "Arguments": "instance"
                },
                {
                    "Name": "onBeforeShow",
                    "IsChecked": false,
                    "Arguments": "instance, activeItem, activeSlide"
                },
                {
                    "Name": "onBeforeHide",
                    "IsChecked": false,
                    "Arguments": "instance, activeItem, activeSlide"
                },
                {
                    "Name": "onAfterShow",
                    "IsChecked": false,
                    "Arguments": "instance, activeItem, activeSlide"
                },
                {
                    "Name": "onAfterHide",
                    "IsChecked": false,
                    "Arguments": "instance, activeItem, activeSlide"
                },
                {
                    "Name": "onDestroy",
                    "IsChecked": false,
                    "Arguments": "instance"
                }
            ],
            "Files": ['html', 'js']
        },

        "tabs": {
            "Id": "tabs",
            "Title": "WIDGET_TABS",
            "Category": "CATEGORY_WIDGET",
            "Demo": true,
            "IsChecked": false,
            "Enable": true,
            "Installed": [],
            "Structure": {
                "ColumnsTitle": ['OPTIONS_GENERAL', 'OPTIONS_ADDITIONAL'],
                "Columns": [
                    [
                        "selector",
                        "tabLink",
                        "attrb"
                    ],
                    [
                        "activeClass",
                        "eventMode",
                        "collapsedTab",
                        "checkHash",
                        "responsive"
                    ]
                ],
                "DefaultDisplay": [
                    "selector",
                    "tabLink"
                ]
            },
            "Options": {
                "selector": {
                    "label": "Selector block",
                    "value": ".tabs-link",
                    "type" : "text"
                },
                "tabLink": {
                    "label": 'Tab links',
                    "value": 'a',
                    "type" : 'text'
                },
                "attrb": {
                    "label": 'Attribute',
                    "value": 'href',
                    "type" : 'text'
                },
                "activeClass": {
                    "label": 'Active class',
                    "value": 'active',
                    "type" : 'text'
                },
                "eventMode": {
                    "label": "Event mode",
                    "value": "click",
                    "valueList": ["click", "mouseenter"],
                    "type" : "select"
                },
                "collapsedTab": {
                    "label": "Collapse tab",
                    "value": false,
                    "type" : "checkbox"
                },
                "checkHash": {
                    "label": "Hash",
                    "value": false,
                    "type" : "checkbox"
                },
                "responsive": {
                    "label": "Responsive helper",
                    "value": "",
                    "type" : "text"
                }
            },
            "Callbacks": [
                {
                    "Name": "onInit",
                    "IsChecked": false,
                    "Arguments": "instance"
                },
                {
                    "Name": "onChange",
                    "IsChecked": false,
                    "Arguments": "instance, activeItem"
                },
                {
                    "Name": "onShow",
                    "IsChecked": false,
                    "Arguments": "instance, activeItem"
                },
                {
                    "Name": "onHide",
                    "IsChecked": false,
                    "Arguments": "instance, activeItem"
                },
                {
                    "Name": "onDestroy",
                    "IsChecked": false,
                    "Arguments": "instance"
                }
            ],
            "Files": ['html', 'js']
        }
    }
}