Ext.define('Admin.view.cekinfokendaraan.CekInfoKendaraanEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'cekinfokendaraan-edit',

    requires: [
        'Ext.Button',
        'Ext.field.Text',
        'Ext.field.Date',
        'Ext.field.Time',
        'Ext.field.File'
    ],

    /*bbar: ['->', {
        ui: 'header',
        text: '<b>Simpan</b>',
        handler: 'onSave'
    }, {
        ui: 'header',
        text: '<b>Batal</b>',
        handler: 'onShow'
    }],

    listeners: {
        added: 'onLoadEdit'
    },*/

    bodyPadding: 20,

    items: [{
        xtype: 'component',
        html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; font-size: 17px;">Nomor Polisi:</div>',
        margin: '0 0 10px 0'
    },
    {
        layout: 'hbox',
        defaults: {
            //required: true,
            labelAlign: 'top',
            //errorTarget: 'under'
        },
        items: [{
            xtype: 'textfield',
            /*style: {
                'text-transform': 'uppercase;'
            },*/
            flex: 1.5,
            name: 'kode_kota',
            itemId: 'kode_kota',
            //label: 'KD. Kota'
        },
        {
            xtype: 'textfield',
            /*style: {
                'text-transform': 'uppercase;'
            },*/
            flex: 3,
            margin: '0 5px 0 5px',
            name: 'nomor_kendaraan',
            itemId: 'nomor_kendaraan',
            //label: 'No. Kendaraan'
        },
        {
            xtype: 'textfield',
            /*style: {
                'text-transform': 'uppercase;'
            },*/
            flex: 2,
            name: 'kode_wilayah',
            itemId: 'kode_wilayah',
            //label: 'KD. Wilayah'
        }]
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
            text: '<b>Cari</b>',
            iconAlign: 'right',
            iconCls: 'x-fa fa-search',
            ui: 'confirm',
            width: '100%',
            handler: 'onSave',
            margin: '5px 0 0 5px',
            flex: 1
        }]
    }]
});
