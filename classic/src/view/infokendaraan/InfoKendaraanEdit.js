Ext.define('Admin.view.infokendaraan.InfoKendaraanEdit', {
    extend: 'Ext.form.Panel',
    xtype: 'infokendaraan-edit',
    
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
        html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">DATA KENDARAAN</div>'
    },
    {
        xtype: 'container',
        itemId: 'kolom-data-kendaraan',
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
                xtype: 'textfield',
                name: 'nama_pemilik',
                itemId: 'nama_pemilik',
                fieldLabel: 'Nama Pemilik'
            }, 
            {
                xtype: 'textfield',
                name: 'alamat',
                itemId: 'alamat',
                fieldLabel: 'Alamat'
            }, 
            {
                xtype: 'textfield',
                name: 'kota_kabupaten',
                itemId: 'kota_kabupaten',
                fieldLabel: 'Kota / Kabupaten'
            }, 
            {
                xtype: 'textfield',
                name: 'kd_jenis_kb',
                itemId: 'kd_jenis_kb',
                fieldLabel: 'KD Jenis KB'
            }, 
            {
                xtype: 'textfield',
                name: 'kd_merek_kb',
                itemId: 'kd_merek_kb',
                fieldLabel: 'KD Merek KB'
            }, 
            {
                xtype: 'textfield',
                name: 'kd_fungsi',
                itemId: 'kd_fungsi',
                fieldLabel: 'KD Fungsi'
            },  
            {
                xtype: 'textfield',
                name: 'type',
                itemId: 'type',
                fieldLabel: 'Type'
            },  
            {
                xtype: 'textfield',
                name: 'tahun_pembuatan',
                itemId: 'tahun_pembuatan',
                fieldLabel: 'Tahun Buat'
            }, 
            {
                xtype: 'textfield',
                name: 'nomor_bpkb',
                itemId: 'nomor_bpkb',
                fieldLabel: 'No. BPKB'
            }, 
            {
                xtype: 'textfield',
                name: 'warna_kb',
                itemId: 'warna_kb',
                fieldLabel: 'Warna KB'
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

            items: [{
                xtype: 'textfield',
                name: 'jumlah_cc',
                itemId: 'jumlah_cc',
                fieldLabel: 'Jumlah CC'
            },
            {
                xtype: 'textfield',
                name: 'no_rangka',
                itemId: 'no_rangka',
                fieldLabel: 'Nomor Rangka'
            }, 
            {
                xtype: 'textfield',
                name: 'no_mesin',
                itemId: 'no_mesin',
                fieldLabel: 'Nomor Mesin'
            }, 
            {
                xtype: 'textfield',
                name: 'milik_ke',
                itemId: 'milik_ke',
                fieldLabel: 'Milik Ke'
            }, 
            {
                xtype: 'textfield',
                name: 'warna_plat',
                itemId: 'warna_plat',
                fieldLabel: 'Warna Plat'
            }, 
            {
                xtype: 'datefield',
                name:'tanggal_akhir_pajak',
                itemId:'tanggal_akhir_pajak',
                fieldLabel: 'Tanggal Akhir Pajak',
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                value: new Date()
            }, 
            {
                xtype: 'datefield',
                name:'tanggal_akhir_stnk',
                itemId:'tanggal_akhir_stnk',
                fieldLabel: 'Tanggal Akhir STNK',
                format: 'd-m-Y',
                submitFormat: 'Y-m-d',
                value: new Date()
            }, 
            {
                xtype: 'combo',
                name: 'blokir_ktp',
                itemId: 'blokir_ktp',
                fieldLabel: 'Blokir KTP',
                editable: false,
                selectOnFocus: false,
                forceSelection: true,
                queryMode: 'local',
                store: Ext.create('Ext.data.Store', {
                    fields: ['nama'],
                    data:[
                        {nama: 'YA'}, 
                        {nama: 'TIDAK'}
                    ]
                }),
                valueField: 'nama',
                displayField: 'nama'
            }, 
            {
                xtype: 'combo',
                name: 'status_stnk',
                itemId: 'status_stnk',
                fieldLabel: 'Status STNK',
                editable: false,
                selectOnFocus: false,
                forceSelection: true,
                queryMode: 'local',
                store: Ext.create('Ext.data.Store', {
                    fields: ['nama'],
                    data:[
                        {nama: 'ASLI'}, 
                        {nama: 'DUPLIKAT'}
                    ]
                }),
                valueField: 'nama',
                displayField: 'nama'
            }, 
            {
                xtype: 'textfield',
                name: 'status_rubentina',
                itemId: 'status_rubentina',
                fieldLabel: 'Status Rubentina'
            }]
        }]
    },
    {
        xtype: 'component',
        html: '<div style="background-color: #8C8C8C; color: white; padding: 10px; margin-bottom: 10px; font-size: 17px;">DATA PAJAK</div>'
    },
    {
        xtype: 'panel',
        itemId: 'kolom-data-pajak',
        flex: 1,
        defaults: {
            msgTarget: 'side',
            anchor: '100%',
            selectOnFocus: true,
            allowBlank: false
        },
        layout: 'anchor',            
        bodyPadding: 10,
        items: [{
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            labelSeparator: '',
            labelStyle: 'text-align: right; font-weight: bold;',
            fieldLabel: '&nbsp;',
            items: [{
                xtype: 'component',
                flex: 1,
                html: '<div style="font-size: 13px; text-align: right; font-weight: bold;">POKOK&nbsp;</div>',
                margin: '0 0 0 5'
            }, 
            {
                xtype: 'component',
                flex: 1,
                html: '<div style="font-size: 13px; text-align: right; font-weight: bold;">SANKSI ADMINISTRATIF&nbsp;</div>',
                margin: '0 0 0 5'
            }, 
            {
                xtype: 'component',
                flex: 1,
                html: '<div style="font-size: 13px; text-align: right; font-weight: bold;">JUMLAH&nbsp;</div>',
                margin: '0 0 0 5'
            }]
        }, 
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            labelSeparator: '',
            labelStyle: 'text-align: right; font-weight: bold;',
            fieldLabel: 'BBNKB&nbsp;&nbsp;&nbsp;',
            items: [{
                xtype: 'currencyfield',
                name: 'bbnkb_pokok',
                itemId: 'bbnkb_pokok',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {                    
                    change: 'onBbnkbPokokChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'bbnkb_sanksi_administratif',
                itemId: 'bbnkb_sanksi_administratif',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {                    
                    change: 'onBbnkbSanksiAdministratifChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'bbnkb_jumlah',
                itemId: 'bbnkb_jumlah',
                flex: 1,
                margin: '0 0 0 5',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9; text-align: right; font-weight: bold;',
                value: 0
            }]
        }, 
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            labelSeparator: '',
            labelStyle: 'text-align: right; font-weight: bold;',
            fieldLabel: 'PKB&nbsp;&nbsp;&nbsp;',
            items: [{
                xtype: 'currencyfield',
                name: 'pkb_pokok',
                itemId: 'pkb_pokok',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {
                    change: 'onPkbPokokChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'pkb_sanksi_administratif',
                itemId: 'pkb_sanksi_administratif',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {
                    change: 'onPkbSanksiAdministratifChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'pkb_jumlah',
                itemId: 'pkb_jumlah',
                flex: 1,
                margin: '0 0 0 5',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9; text-align: right; font-weight: bold;',
                value: 0
            }]
        }, 
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            labelSeparator: '',
            labelStyle: 'text-align: right; font-weight: bold;',
            fieldLabel: 'SWDKLLJ&nbsp;&nbsp;&nbsp;',
            items: [{
                xtype: 'currencyfield',
                name: 'sdwkllj_pokok',
                itemId: 'sdwkllj_pokok',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {
                    change: 'onSdwklljPokokChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'sdwkllj_sanksi_administratif',
                itemId: 'sdwkllj_sanksi_administratif',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {
                    change: 'onSdwklljSanksiAdministratifChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'sdwkllj_jumlah',
                itemId: 'sdwkllj_jumlah',
                flex: 1,
                margin: '0 0 0 5',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9; text-align: right; font-weight: bold;',
                value: 0
            }]
        }, 
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            labelSeparator: '',
            labelStyle: 'text-align: right; font-weight: bold;',
            fieldLabel: 'BEA STNK&nbsp;&nbsp;&nbsp;',
            items: [{
                xtype: 'currencyfield',
                name: 'bea_stnk_pokok',
                itemId: 'bea_stnk_pokok',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {
                    change: 'onBeaStnkPokokChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'bea_stnk_sanksi_administratif',
                itemId: 'bea_stnk_sanksi_administratif',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {                    
                    change: 'onBeaStnkSanksiAdministratifChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'bea_stnk_jumlah',
                itemId: 'bea_stnk_jumlah',    
                flex: 1,
                margin: '0 0 0 5',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9; text-align: right; font-weight: bold;',
                value: 0
            }]
        }, 
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            labelSeparator: '',
            labelStyle: 'text-align: right; font-weight: bold;',
            fieldLabel: 'BEA TNKB&nbsp;&nbsp;&nbsp;',
            items: [{
                xtype: 'currencyfield',
                name: 'bea_tnkb_pokok',
                itemId: 'bea_tnkb_pokok',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {
                    change: 'onBeaTnkbPokokChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'bea_tnkb_sanksi_administratif',
                itemId: 'bea_tnkb_sanksi_administratif',
                flex: 1,
                margin: '0 0 0 5',
                fieldStyle: 'text-align: right;',
                value: 0,
                listeners: {
                    change: 'onBeaTnkbSanksiAdministratifChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'bea_tnkb_jumlah',
                itemId: 'bea_tnkb_jumlah',
                flex: 1,
                margin: '0 0 0 5',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9; text-align: right; font-weight: bold;',
                value: 0
            }]
        }, 
        {
            xtype: 'fieldcontainer',
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            labelSeparator: '',
            labelStyle: 'text-align: right; font-weight: bold;',
            fieldLabel: 'JUMLAH&nbsp;&nbsp;&nbsp;',
            items: [{
                xtype: 'currencyfield',
                name: 'jumlah_pokok',
                itemId: 'jumlah_pokok',
                flex: 1,
                margin: '0 0 0 5',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9; text-align: right; font-weight: bold;',
                value: 0,
                listeners: {                    
                    change: 'onJumlahPokokChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'jumlah_sanksi_administratif',
                itemId: 'jumlah_sanksi_administratif',
                flex: 1,
                margin: '0 0 0 5',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9; text-align: right; font-weight: bold;',
                value: 0,
                listeners: {                    
                    change: 'onJumlahSanksiAdministratifChange'
                }
            }, 
            {
                xtype: 'currencyfield',
                name: 'jumlah_total',
                itemId: 'jumlah_total',
                flex: 1,
                margin: '0 0 0 5',
                readOnly: true,
                fieldStyle: 'background: none #F8F9F9; text-align: right; font-weight: bold;',
                value: 0
            }]
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
