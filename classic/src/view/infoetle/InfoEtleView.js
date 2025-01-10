Ext.define('Admin.view.infoetle.InfoEtleView',{
    extend: 'Ext.panel.Panel',
    xtype: 'infoetle-view',

    cls: 'infoetle-view shadow',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        afterrender: 'onViewLoad'
    },

    items: [{
        xtype: 'panel',
        bodyPadding: '20px 20px 0 20px',

        layout: 'anchor',

        defaults: {
            anchor: '100%',
            labelWidth: 100,
            fieldStyle: 'background: none #F8F9F9;',
            readOnly: true
        },
        
        items: [{
            xtype: 'textfield',
            name: 'judul',
            fieldLabel: 'Judul'
        },
        {
            xtype: 'textfield',
            name: 'kepada',
            fieldLabel: 'Kepada'
        },
        {
            xtype: 'textfield',
            name: 'tanggal',
            fieldLabel: 'Tanggal'
        }] 
    }, 
    {
        xtype: 'dataview',
        scrollable: true,
        itemId: 'dataview-infoetle',
        flex: 1,
        cls: 'infoetle-view',
        store: {
            type: 'infoetle',
            autoLoad: false
        },
        tpl: new Ext.XTemplate(
        '<tpl for=".">',
            '<div class="infoetle">',
                '<div class="subtitle">DETAIL infoetle</div>',
                '<div class="soal">{penjelasan}</div>',
            '</div>',
            '<div style="display: none;">{[MathJax.Hub.Queue(["Typeset", MathJax.Hub])]}</div>',
        '</tpl>'),
        itemSelector: 'div.soal'
    }],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-red',
                text: 'Tutup',
                handler: 'onCloseViewinfoetleClick'
            }
        ]
    }

});
