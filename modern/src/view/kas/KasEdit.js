Ext.define('Admin.view.kas.KasEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'kas-edit',

    requires: [
        'Ext.Button',
        'Ext.field.Text',
        'Ext.field.Date',
        'Ext.field.Time',
        'Ext.field.File'
    ],

    bodyPadding: 20,

    defaults: {
        labelAlign: 'top',
        required: true,
        errorTarget: 'under'
    },

    listeners: {
        added: 'onLoadEdit'
    },

    items: [{
        xtype: 'textfield',
        itemId: 'tanggal',
        name: 'tanggal',
        label: 'Tanggal',
        readOnly: true
    }, {
        xtype: 'textfield',
        itemId: 'jumlah',
        name: 'jumlah',            
        label: 'Jumlah',
        value: 0,
        listeners: {
            focusleave: function( field, e) {
                //console.log(e);
                var func = Ext.create('Admin.view.currency');
                var value = field.getRawValue();
                field.setValue(value>0?func.currency(value):'0');
            },
            focusenter: function(field, e) {
                //console.log(e);
                var v = field.getRawValue();
                field.setValue(v.replace(/[\,]/g, ''));
            } 
        }
    }, {
        xtype: 'combobox',
        label: 'Jenis Kas',
        name: 'jenis',
        queryMode: 'local',
        displayField: 'nama',
        valueField: 'kode',
        forceSelection: true,
        store: {
            type: 'jeniskas'
        },
        value: 'MASUK'
    }, {
        xtype: 'textareafield',
        name: 'keterangan',
        label: 'Keterangan',
        value: ''
    },
    {
        layout: 'hbox',
        margin: '10px 0 0 0',
        items: [{
            xtype: 'button',
            text: '<b>Batal</b>',
            iconAlign: 'right',
            iconCls: 'x-fa fa-times',
            ui: 'gray-button',
            width: '100%',
            handler: 'onShow',
            margin: '5px 5px 0 0',
            flex: 1
        }, 
        {
            xtype: 'button',
            text: '<b>Simpan</b>',
            iconAlign: 'right',
            iconCls: 'x-fa fa-save',
            ui: 'confirm',
            width: '100%',
            handler: 'onSave',
            margin: '5px 0 0 5px',
            flex: 1
        }]
    }]
});
