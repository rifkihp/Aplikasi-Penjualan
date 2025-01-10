Ext.define('Admin.view.infoetle.InfoEtleEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'infoetle-edit',
    
    bodyPadding: 10,

    cls: 'shadow',

    listeners: {
        render: 'onFormLoad'
    },
    
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
        
    items: [{
        xtype: 'component',
        html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">DATA PERMINTAAN</div>'
    },
    {
        xtype: 'container',
        itemId: 'kolom-data-permintaan',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            flex: 1,
            defaults: {
                labelSeparator: '',
                msgTarget: 'side',
                anchor: '100%',
                selectOnFocus: true,
                allowBlank: false,
                labelAlign: 'top',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9;'
            },
            layout: 'anchor',
            bodyPadding: 10,

            items: [{
                xtype: 'textfield',
                name: 'domisili',
                fieldLabel: 'Domisili'
            }, {
                xtype: 'textfield',
                name: 'nama_pemohon',
                fieldLabel: 'Nama Pemohon'
            }]
        },
        {
            xtype: 'panel',
            flex: 1,
            defaults: {
                labelSeparator: '',
                msgTarget: 'side',
                anchor: '100%',
                selectOnFocus: true,
                allowBlank: false,
                labelAlign: 'top',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9;'
            },
            layout: 'anchor',
            bodyPadding: 10,

            items: [{
                xtype: 'textfield',
                name: 'nomor_polisi',
                fieldLabel: 'Nomor Polisi'
            }, 
            {
                xtype: 'textfield',
                name: 'waktu_permintaan',
                fieldLabel: 'Waktu Permintaan'
            }]
        }]
    },
    {
        xtype: 'component',
        html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">UPLOAD INFORMASI ETLE</div>'
    },
    {
        xtype: 'container',
        itemId: 'kolom-data-etle',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'panel',
            flex: 1,
            defaults: {
                labelSeparator: '',
                msgTarget: 'side',
                anchor: '100%',
                selectOnFocus: true,
                allowBlank: false,
                labelAlign: 'top',
            },
            layout: 'anchor',
            
            bodyPadding: 10,

            items: [{
                xtype: 'fileupload',
                fieldLabel: 'Upload Tangkap Layar 1',
                itemId: 'etle_tangkap_layar_1',
                ext: 'jpg|jpeg',
                keterangan: 'Tipe file harus jpg atau jpeg.'
            },
            {
                xtype: 'fileupload',
                fieldLabel: 'Upload Tangkap Layar 2',
                itemId: 'etle_tangkap_layar_2',
                ext: 'jpg|jpeg',
                keterangan: 'Tipe file harus jpg atau jpeg.'
            }, 
            {
                xtype: 'fileupload',
                fieldLabel: 'Upload Tangkap Layar 3',
                itemId: 'etle_tangkap_layar_3',
                ext: 'jpg|jpeg',
                keterangan: 'Tipe file harus jpg atau jpeg.'
            },
            {
                xtype: 'fileupload',
                fieldLabel: 'Upload Tangkap Layar 4',
                itemId: 'etle_tangkap_layar_4',
                ext: 'jpg|jpeg',
                keterangan: 'Tipe file harus jpg atau jpeg.'
            }, {
                xtype: 'fileupload',
                fieldLabel: 'Upload Tangkap Layar 5',
                itemId: 'etle_tangkap_layar_5',
                ext: 'jpg|jpeg',
                keterangan: 'Tipe file harus jpg atau jpeg.'
            },
            {
                xtype: 'fileupload',
                fieldLabel: 'Upload Tangkap Layar 6',
                itemId: 'etle_tangkap_layar_6',
                ext: 'jpg|jpeg',
                keterangan: 'Tipe file harus jpg atau jpeg.'
            }]
        },
        {
            xtype: 'panel',
            flex: 1,
            defaults: {
                labelSeparator: '',
                msgTarget: 'side',
                anchor: '100%',
                selectOnFocus: true,
                allowBlank: false,
                labelAlign: 'top',
            },
            layout: 'anchor',
            
            bodyPadding: 10,

            items: []
        }]
    }],

    bbar: {
        overflowHandler: 'menu',
        items: [
            '->',
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-red',
                text: 'Batal',
                handler: 'onCancelButtonClick'
            },
            {
                xtype: 'button',
                width: 80,
                ui: 'soft-green',
                text: 'Simpan',
                handler: 'onSaveButtonClick'
            }
        ]
    }
    
});
